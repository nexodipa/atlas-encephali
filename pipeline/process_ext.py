"""Extensión v14 del paquete de datos: añade a build/ (sin rehacer el resto)
- núcleos del tálamo (THOMAS; Saranathan y cols., 2021; CC0) como mallas,
- núcleos del sistema activador ascendente del tronco (Harvard AAN v2.0; Edlow y cols., 2024; CC0) como mallas y centroides,
- territorios arteriales por vértice de corteza y de estructuras profundas
  (Digital 3D Brain MRI Arterial Territories Atlas; Liu y cols., 2023; Johns Hopkins, CC BY-SA 4.0).
Uso: python pipeline/process_ext.py  (en el directorio de datos, con build/ del proyecto como entrada y salida)
"""
import gzip, json, os, sys
import numpy as np, nibabel as nib
from scipy import ndimage
from skimage import measure
import fast_simplification

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.environ.get('ATLAS_DATA', '/root/data')
NL = '/usr/local/lib/python3.13/site-packages/nilearn/datasets/data/fsaverage5/'
M305 = np.array([[1.0022, 0.0071, -0.0177, 0.0528], [-0.0146, 0.9990, 0.0027, -1.5519], [0.0129, 0.0094, 1.0027, -1.2012]])
to152 = lambda v: v @ M305[:, :3].T + M305[:, 3]
ras2three = lambda v: np.stack([v[:, 0], v[:, 2], v[:, 1]], 1)
three2ras = lambda v: np.stack([v[:, 0], v[:, 2], v[:, 1]], 1)
qverts = lambda v: np.round(v * 100).astype(np.int16)

meta = json.load(open(f'{ROOT}/build/meta.json'))
raw = gzip.decompress(open(f'{ROOT}/build/atlas.bin.gz', 'rb').read())
blobs = []
for name, (off, dt, shape) in sorted(meta['index'].items(), key=lambda x: x[1][0]):
    n = int(np.prod(shape)) if shape else 1
    blobs.append((name, np.frombuffer(raw, dtype=dt, count=n, offset=off).reshape(shape)))
have = {n for n, _ in blobs}
def add(name, arr):
    global blobs
    blobs = [(n, a) for n, a in blobs if n != name]
    blobs.append((name, np.ascontiguousarray(arr)))
def get(name): return dict(blobs)[name]

def mesh(mask, affine, sigma, target, upsample=1):
    if upsample > 1:
        mask = ndimage.zoom(mask.astype(np.float32), upsample, order=1) > 0.5
        affine = affine.copy(); affine[:3, :3] /= upsample
    vol = ndimage.gaussian_filter(mask.astype(np.float32), sigma * upsample)
    v, f, _, _ = measure.marching_cubes(vol, min(0.5, float(vol.max()) * 0.45))
    if len(f) > target:
        v, f = fast_simplification.simplify(v.astype(np.float32), f.astype(np.int32), 1 - target / len(f))
    xyz = nib.affines.apply_affine(affine, v)
    t = xyz[f]; s = np.einsum('ij,ij->i', t[:, 0], np.cross(t[:, 1], t[:, 2])).sum()
    if s < 0: f = f[:, [0, 2, 1]]
    return xyz, f

def emit(key, mask, affine, sigma, target, upsample=1):
    xyz, f = mesh(mask, affine, sigma, target, upsample)
    add(f'deep_{key}_pos', qverts(ras2three(xyz))); add(f'deep_{key}_idx', f[:, [0, 2, 1]].astype(np.uint16))
    c = xyz.mean(0)
    print(key, len(xyz), len(f), c.round(1))
    return c

# ---- tálamo: THOMAS ----
th = nib.load(f'{DATA}/data-atlas/human/THOMAS.nii.gz'); td = np.asarray(th.dataobj).astype(int)
tnames = {int(l.split()[0]): l.split()[1] for l in open(f'{DATA}/data-atlas/human/THOMAS.txt') if l.strip()}
thn = []
for lab, nm in tnames.items():
    base, side = nm.rsplit('_', 1)
    if base == 'MTT': continue  # haz mamilotalámico: no es un núcleo
    m = td == lab
    if m.sum() < 10: continue
    c = nib.affines.apply_affine(th.affine, np.argwhere(m)).mean(0)
    sd = 'L' if c[0] < 0 else 'R'
    key = f'{sd}th{base.lower()}'
    emit(key, m, th.affine, 1.2, 700)
    thn.append(key)
meta['thn'] = thn

# ---- tronco: Harvard AAN v2 ----
A = f'{DATA}/canlab/np/Atlases_and_parcellations/2023_harvard_aan_brainstem_atlas/'
import scipy.io as sio
names = list(sio.loadmat(A + 'harvard_aan_v2_MNI152NLin2009cAsym_atlas_regions.mat', squeeze_me=True)['region_names'])
aan = nib.load(A + 'harvard_aan_v2_MNI152NLin2009cAsym_atlas_regions.hdr'); ad = np.asarray(aan.dataobj).squeeze().astype(int)
bsn = []; pts = {}
for i, nm in enumerate(names, 1):
    if nm == 'VTA': continue  # ya está en CIT168
    m = ad == i
    c = nib.affines.apply_affine(aan.affine, np.argwhere(m)).mean(0)
    if '_' in nm:
        side, base = nm.split('_'); sd = 'L' if c[0] < 0 else 'R'; key = sd + 'bs' + base.lower()
    else:
        key = 'bs' + nm.lower()
    emit(key, m, aan.affine, 0.7, 600, upsample=2)
    bsn.append(key); pts.setdefault(key.lstrip('LR'), []).append([round(float(x), 1) for x in c])
meta['bsn'] = bsn
meta['bsn_mni'] = pts

# ---- territorios arteriales ----
art = nib.load(f'{DATA}/art/x/Atlas_MNI152/ArterialAtlas.nii'); ard = np.rint(np.asarray(art.dataobj).squeeze()).astype(int)
inv = np.linalg.inv(art.affine)
_, (I, J, K) = ndimage.distance_transform_edt(ard == 0, return_indices=True)
def samp(xyz, maxd=4.0):
    ijk = np.rint(nib.affines.apply_affine(inv, xyz)).astype(int)
    ijk = np.clip(ijk, 0, np.array(ard.shape) - 1)
    i, j, k = ijk.T
    ii, jj, kk = I[i, j, k], J[i, j, k], K[i, j, k]
    d = np.sqrt((ii - i) ** 2 + (jj - j) ** 2 + (kk - k) ** 2)
    out = ard[ii, jj, kk]; out[d > maxd] = 0
    return out
# comprobación de lateralidad de las etiquetas (impares = izquierda)
for lab in (1, 7, 19):
    c = nib.affines.apply_affine(art.affine, np.argwhere(ard == lab)).mean(0); print('art', lab, c.round(1))
for hemi, nl in (('lh', 'left'), ('rh', 'right')):
    pial = to152(nib.load(NL + f'pial_{nl}.gii.gz').darrays[0].data.astype(np.float64))
    white = to152(nib.load(NL + f'white_{nl}.gii.gz').darrays[0].data.astype(np.float64))
    votes = np.stack([samp(white + t * (pial - white)) for t in (0.2, 0.4, 0.6, 0.8)], 1)
    lab = np.array([np.bincount(r[r > 0]).argmax() if (r > 0).any() else 0 for r in votes]).astype(np.uint8)
    # suavizado: vértices sin etiqueta toman la de sus vecinos
    f = nib.load(NL + f'pial_{nl}.gii.gz').darrays[1].data
    for _ in range(4):
        miss = lab == 0
        if not miss.any(): break
        for a, b in ((0, 1), (1, 2), (2, 0)):
            src, dst = f[:, a], f[:, b]
            sel = miss[dst] & (lab[src] > 0); lab[dst[sel]] = lab[src[sel]]
    add(f'art_{hemi}', lab)
    print(hemi, 'art sin etiqueta', int((lab == 0).sum()), np.bincount(lab, minlength=33).tolist())
for key in meta['deep'] + thn + bsn + ['cb']:
    nm = f'deep_{key}_pos' if key != 'cb' else 'cb_pos'
    if nm not in dict(blobs): continue
    xyz = three2ras(get(nm).astype(np.float64) / 100)
    lab = samp(xyz, 6).astype(np.uint8)
    add(f'{"deep_"+key if key!="cb" else "cb"}_art', lab)

# ---- empaquetado ----
off = 0; index = {}; parts = []
for name, arr in blobs:
    b = arr.tobytes(); pad = (-off) % 4
    if pad: parts.append(b'\0' * pad); off += pad
    index[name] = [off, str(arr.dtype), list(arr.shape)]; parts.append(b); off += len(b)
meta['index'] = index
open(f'{ROOT}/build/atlas.bin.gz', 'wb').write(gzip.compress(b''.join(parts), 9))
json.dump(meta, open(f'{ROOT}/build/meta.json', 'w'), ensure_ascii=False)
print('gz', os.path.getsize(f'{ROOT}/build/atlas.bin.gz'))
