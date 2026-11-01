"""Construye el paquete de datos de Atlas Encephali v2.

Fuentes:
- fsaverage5 (FreeSurfer, vía nilearn): superficies pial, inflada y sulc.
- ENIGMA Toolbox (Larivière y cols., 2021): parcelaciones Desikan-Killiany y HCP-MMP1 en fsa5,
  y estadísticas de casos-controles de los grupos de trabajo ENIGMA.
- Harvard-Oxford subcortical (FSL, vía neuroparc): núcleos, tronco, ventrículos laterales.
- Atlas cerebeloso probabilístico (Diedrichsen y cols., 2009): lóbulos y núcleos profundos.
"""
import gzip, json, struct, glob, os, csv
import numpy as np, nibabel as nib
from scipy import ndimage
from skimage import measure
import fast_simplification

E = 'ENIGMA/enigmatoolbox/datasets/'
NL = '/usr/local/lib/python3.13/site-packages/nilearn/datasets/data/fsaverage5/'

# MNI305 (fsaverage) -> MNI152 (FreeSurfer CoordinateSystems)
M305 = np.array([[1.0022, 0.0071, -0.0177, 0.0528],
                 [-0.0146, 0.9990, 0.0027, -1.5519],
                 [0.0129, 0.0094, 1.0027, -1.2012]])
def to152(v):
    return v @ M305[:, :3].T + M305[:, 3]

def ras2three(v):  # RAS mm -> three (x=R, y=S, z=A), en metros escalados *0.01
    return np.stack([v[:, 0], v[:, 2], v[:, 1]], 1)

blobs = []  # (name, ndarray)
meta = {}

def add(name, arr):
    blobs.append((name, np.ascontiguousarray(arr)))

def qverts(v):
    # cuantiza a int16 con paso 0.01 mm
    return np.round(v * 100).astype(np.int16)

# ---------------- Corteza ----------------
dk_names = open(E + 'matrices/hcp_connectivity/funcLabels_ctx.csv').read().strip().split(',')
gl_names = open(E + 'matrices/hcp_connectivity/funcLabels_ctx_glasser_360.csv').read().strip().split(',')
aparc = np.loadtxt(E + 'parcellations/aparc_fsa5.csv', dtype=int)
glas = np.loadtxt(E + 'parcellations/glasser_360_fsa5.csv', dtype=int)
a_idx = list(range(1, 4)) + list(range(5, 39)) + list(range(40, 71))
lab2dk = {lab: i for i, lab in enumerate(a_idx)}  # label aparc -> índice en dk_names (0..67)

for hemi, nlname in (('lh', 'left'), ('rh', 'right')):
    sl = slice(0, 10242) if hemi == 'lh' else slice(10242, 20484)
    pial = nib.load(NL + f'pial_{nlname}.gii.gz')
    v = pial.darrays[0].data.astype(np.float64); f = pial.darrays[1].data.astype(np.int64)
    infl = nib.load(NL + f'infl_{nlname}.gii.gz').darrays[0].data.astype(np.float64)
    sulc = nib.load(NL + f'sulc_{nlname}.gii.gz').darrays[0].data
    v = to152(v)
    # inflada: centrada sobre el centroide pial y escalada al tamaño pial
    infl = infl - infl.mean(0); s = (v.std(0) / infl.std(0)).mean() * 0.95
    infl = infl * s + v.mean(0)
    # separar los hemisferios inflados lateralmente
    infl[:, 0] += (-12 if hemi == 'lh' else 12)
    f = f[:, [0, 2, 1]]  # ras->three invierte el giro
    a = aparc[sl]; g = glas[sl]
    dk = np.array([lab2dk.get(x, 255) for x in a], dtype=np.uint8)
    gl = np.where(g > 0, g, 0).astype(np.uint16)
    if hemi == 'rh': gl = np.where((gl > 0) & (gl <= 180), gl + 180, gl).astype(np.uint16)
    add(f'ctx_{hemi}_pos', qverts(ras2three(v)))
    add(f'ctx_{hemi}_infl', qverts(ras2three(infl)))
    add(f'ctx_{hemi}_idx', f.astype(np.uint16))
    add(f'ctx_{hemi}_dk', dk)
    add(f'ctx_{hemi}_gl', gl)
    add(f'ctx_{hemi}_sulc', np.clip(np.round(sulc * 20), -127, 127).astype(np.int8))
    print(hemi, 'glasser range', gl[gl > 0].min(), gl.max(), 'dk', sorted(set(dk))[:3], sorted(set(dk))[-3:])

meta['dk_names'] = dk_names
meta['gl_names'] = gl_names

# Área HCP-MMP1 -> región Desikan dominante (calculado)
host = {}
for gi in range(1, 361):
    m = glas == gi
    if not m.any():
        continue
    labs = [lab2dk.get(x) for x in aparc[m] if x in lab2dk]
    if labs:
        host[gi] = int(np.bincount(labs).argmax())
meta['gl_host'] = host

# ---------------- Volúmenes ----------------
def mesh_from_mask(mask, affine, sigma=0.9, target=None, labels_vol=None):
    vol = ndimage.gaussian_filter(mask.astype(np.float32), sigma)
    verts, faces, _, _ = measure.marching_cubes(vol, 0.5)
    if target and len(faces) > target:
        verts, faces = fast_simplification.simplify(verts.astype(np.float32), faces.astype(np.int32), 1 - target / len(faces))
    xyz = nib.affines.apply_affine(affine, verts)
    lab = None
    if labels_vol is not None:
        ijk = np.clip(np.round(verts).astype(int), 0, np.array(labels_vol.shape) - 1)
        # etiqueta del vóxel no nulo más cercano
        _, (ii, jj, kk) = ndimage.distance_transform_edt(labels_vol == 0, return_indices=True)
        lab = labels_vol[ii[ijk[:, 0], ijk[:, 1], ijk[:, 2]], jj[ijk[:, 0], ijk[:, 1], ijk[:, 2]], kk[ijk[:, 0], ijk[:, 1], ijk[:, 2]]]
    return xyz, faces, lab

def orient_out(xyz, faces):
    # asegura normales hacia fuera (volumen con signo positivo)
    t = xyz[faces]; vol = np.einsum('ij,ij->i', t[:, 0], np.cross(t[:, 1], t[:, 2])).sum()
    return faces if vol > 0 else faces[:, [0, 2, 1]]

ho = nib.load('np/atlases/label/Human/HarvardOxfordsub-maxprob-thr25_space-MNI152NLin6_res-1x1x1.nii.gz')
hd = np.round(ho.get_fdata()).astype(int)
# Orden FSL: 1-11 izquierda, 12-21 derecha (el CSV de neuroparc invierte los nombres)
HO = {'Lvent': 3, 'Lthal': 4, 'Lcaud': 5, 'Lput': 6, 'Lpal': 7, 'stem': 8, 'Lhippo': 9, 'Lamyg': 10, 'Laccumb': 11,
      'Rvent': 14, 'Rthal': 15, 'Rcaud': 16, 'Rput': 17, 'Rpal': 18, 'Rhippo': 19, 'Ramyg': 20, 'Raccumb': 21}
deep = []
for key, lab in HO.items():
    target = 2600 if key != 'stem' else 5000
    xyz, faces, _ = mesh_from_mask(hd == lab, ho.affine, 0.9, target)
    c = xyz.mean(0)
    if key.startswith('L'): assert c[0] < 0, key
    if key.startswith('R'): assert c[0] > 0, key
    lab_v = None
    if key == 'stem':  # mesencéfalo / protuberancia / bulbo por altura (aprox. MNI)
        z = xyz[:, 2]
        lab_v = np.where(z > -14, 0, np.where(z > -38, 1, 2)).astype(np.uint8)
    faces = orient_out(xyz, faces)
    th = ras2three(xyz); faces = faces[:, [0, 2, 1]]
    add(f'deep_{key}_pos', qverts(th)); add(f'deep_{key}_idx', faces.astype(np.uint16))
    if lab_v is not None: add(f'deep_{key}_lab', lab_v)
    deep.append(key)
    print(key, len(xyz), len(faces), c.round(1))
meta['deep'] = deep

# Cerebelo
cb = nib.load('ca/Diedrichsen_2009/atl-Anatom_space-MNI_dseg.nii')
cd = np.round(cb.get_fdata()).astype(int)
ctx_mask = (cd >= 1) & (cd <= 28)
xyz, faces, lab = mesh_from_mask(ctx_mask, cb.affine, 1.0, 9000, labels_vol=np.where(ctx_mask, cd, 0))
faces = orient_out(xyz, faces)
add('cb_pos', qverts(ras2three(xyz))); add('cb_idx', faces[:, [0, 2, 1]].astype(np.uint16)); add('cb_lab', lab.astype(np.uint8))
print('cerebellum', len(xyz), len(faces))
for key, labs in (('dentL', [29]), ('dentR', [30])):
    xyz, faces, _ = mesh_from_mask(np.isin(cd, labs), cb.affine, 0.7, 800)
    faces = orient_out(xyz, faces)
    add(f'deep_{key}_pos', qverts(ras2three(xyz))); add(f'deep_{key}_idx', faces[:, [0, 2, 1]].astype(np.uint16))
    meta['deep'].append(key)
meta['cb_names'] = [r[1] for r in csv.reader(open('ca/Diedrichsen_2009/atl-Anatom.tsv'), delimiter='\t')][1:]

# ---------------- Estadísticas ENIGMA ----------------
SS = E + 'summary_statistics/'
def read_stats(fn):
    rows = list(csv.reader(open(SS + fn), delimiter=';' if ';' in open(SS + fn).readline() else ','))
    hdr = rows[0]; out = {}
    si = hdr.index('Structure'); di = hdr.index('d_icv')
    ni = hdr.index('n_patients') if 'n_patients' in hdr else None
    nc = hdr.index('n_controls') if 'n_controls' in hdr else None
    fi = hdr.index('fdr_p') if 'fdr_p' in hdr else None
    npat = ncon = None
    for r in rows[1:]:
        if len(r) <= di or not r[si].strip(): continue
        name = r[si].strip().replace('_asy_thick.csv', '').replace('_thickavg', '')
        try: d = float(r[di])
        except: continue
        p = None
        if fi is not None and fi < len(r):
            try: p = float(r[fi].replace('<', ''))
            except: p = None
        out[name] = [round(d, 3), p]
        try:
            if ni is not None and r[ni].strip(): npat = int(r[ni].replace(',', '').replace('"', ''))
            if nc is not None and r[nc].strip(): ncon = int(r[nc].replace(',', '').replace('"', ''))
        except: pass
    return out, npat, ncon

DIS = [
 ('scz', 'Esquizofrenia', 'Schizophrenia_case-controls_CortThick.csv', 'Schizophrenia_case-control_SubVol.csv', True),
 ('bd', 'Trastorno bipolar (adultos)', 'bd_case-controls_CortThick_adult.csv', None, False),
 ('mdd', 'Depresión mayor (adultos)', 'mddadult_case-controls_CortThick.csv', None, False),
 ('ocd', 'TOC (adultos)', None, 'ocdadult_case-controls_SubVol.csv', False),
 ('asd', 'Trastorno del espectro autista', 'asd_meta-analysis_case-controls_CortThick.csv', 'asd_meta-analysis_case-controls_SubVol.csv', False),
 ('adhd', 'TDAH (todas las edades)', 'adhdallages_case-controls_CortThick.csv', 'adhdallages_case-controls_SubVol.csv', False),
 ('tlel', 'Epilepsia temporal con esclerosis hipocampal izquierda', 'tlemtsl_case-controls_CortThick.csv', 'tlemtsl_case-controls_SubVol.csv', False),
 ('pd', 'Enfermedad de Parkinson', 'parkinsons_case-controls_CortThick_PDvsCN.csv', 'parkinsons_case-controls_Subvol_PDvsCN.csv', False),
 ('an', 'Anorexia nerviosa (fase aguda)', 'anorexia_acAN-controls_CortThick.csv', 'anorexia_acAN-controls_SubVol.csv', False),
 ('q22', 'Síndrome de deleción 22q11.2', '22q_case-controls_CortThick.csv', '22q_case-controls_SubVol.csv', False),
]
# completa SubVol de MDD/BD si existen
for fn in os.listdir(SS):
    pass
dis_out = {}
for key, name, ct, sv, neg in DIS:
    entry = {'name': name, 'ctx': {}, 'sub': {}}
    for fn, slot in ((ct, 'ctx'), (sv, 'sub')):
        if not fn: continue
        vals, npat, ncon = read_stats(fn)
        if neg:  # el archivo de esquizofrenia usa el signo control-caso
            vals = {k: [-v[0], v[1]] for k, v in vals.items()}
        vals = {k: v for k, v in vals.items() if not (v[0] == 0 and not v[1])}
        entry[slot] = vals
        entry[slot + '_n'] = [npat, ncon]
        entry[slot + '_file'] = fn
    if key == 'scz':
        entry['ctx_n'] = [4474, 5098]; entry['sub_n'] = [2028, 2540]
    dis_out[key] = entry
    print(key, len(entry['ctx']), len(entry['sub']), entry.get('ctx_n'), entry.get('sub_n'))
meta['disorders'] = dis_out

# ---------------- Empaquetado ----------------
off = 0; index = {}; parts = []
for name, arr in blobs:
    b = arr.tobytes()
    pad = (-off) % 4
    if pad: parts.append(b'\0' * pad); off += pad
    index[name] = [off, str(arr.dtype), list(arr.shape)]
    parts.append(b); off += len(b)
meta['index'] = index
raw = b''.join(parts)
os.makedirs('out', exist_ok=True)
open('out/atlas.bin.gz', 'wb').write(gzip.compress(raw, 9))
json.dump(meta, open('out/meta.json', 'w'), ensure_ascii=False)
print('raw', len(raw), 'gz', os.path.getsize('out/atlas.bin.gz'), 'meta', os.path.getsize('out/meta.json'))
