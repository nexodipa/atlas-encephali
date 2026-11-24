"""Módulo 02 (sistema endocrino): mallas a partir de BodyParts3D 4.0 (© Database Center for Life Science, CC BY 4.0)
y tiroides y paratiroides esquemáticas (BodyParts3D no las incluye), construidas sobre la tráquea y el cartílago cricoides reales.

Entrada: $ATLAS_DATA/bp3d/{partof,isa}_element_parts.txt y los OBJ extraídos de partof_/isa_BP3D_4.0_obj_99.zip.
Salida: endo/build/endo.bin.gz y endo/build/endo.json
Coordenadas: BodyParts3D usa X hacia la izquierda, Y hacia atrás y Z hacia arriba (mm); aquí x = derecha, y = arriba, z = delante.
"""
import gzip, json, os
import numpy as np
import fast_simplification
from scipy import ndimage
from skimage import measure

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.environ.get('ATLAS_DATA', '/root/data') + '/bp3d'
DIRS = [f'{D}/x/partof_BP3D_4.0_obj_99', f'{D}/xi/isa_BP3D_4.0_obj_99']
ELEM = {}
for f in ('partof_element_parts.txt', 'isa_element_parts.txt'):
    for l in open(f'{D}/{f}', encoding='utf-8').read().splitlines()[1:]:
        c, n, fj = l.split('\t')
        if fj.startswith('FJ'): ELEM.setdefault(c, set()).add(fj)

def load_obj(fj):
    for d in DIRS:
        p = f'{d}/{fj}.obj'
        if os.path.exists(p): break
    else: raise FileNotFoundError(fj)
    V, F = [], []
    for l in open(p):
        if l.startswith('v '): V.append([float(x) for x in l.split()[1:4]])
        elif l.startswith('f '):
            idx = [int(t.split('/')[0]) - 1 for t in l.split()[1:]]
            for k in range(1, len(idx) - 1): F.append([idx[0], idx[k], idx[k + 1]])
    return np.array(V, np.float64), np.array(F, np.int64)

def concept(*cs):
    Vs, Fs, off = [], [], 0
    for c in cs:
        for fj in sorted(ELEM[c]):
            v, f = load_obj(fj); Vs.append(v); Fs.append(f + off); off += len(v)
    return np.concatenate(Vs), np.concatenate(Fs)

def to_three(v): return np.stack([-v[:, 0], v[:, 2], -v[:, 1]], 1)

def simplify(v, f, target):
    if len(f) > target:
        v2, f2 = fast_simplification.simplify(v.astype(np.float32), f.astype(np.int32), 1 - target / len(f))
        return v2.astype(np.float64), f2.astype(np.int64)
    return v, f

def sdf_mesh(fields, lo, hi, step=0.5):
    """Superficie de la unión de elipsoides: fields = [(centro, semiejes, conicidad)]."""
    xs, ys, zs = [np.arange(lo[i], hi[i], step) for i in range(3)]
    X, Y, Z = np.meshgrid(xs, ys, zs, indexing='ij'); val = np.full(X.shape, 9.0)
    for c, r, taper in fields:
        dz = (Z - c[2]) / r[2]
        s = 1 + taper * np.clip(dz, 0, None)   # polo superior más fino
        q = ((X - c[0]) / (r[0] / s)) ** 2 + ((Y - c[1]) / (r[1] / s)) ** 2 + dz ** 2
        val = np.minimum(val, q)
    val = ndimage.gaussian_filter(val, 1.0)
    v, f, _, _ = measure.marching_cubes(val, 1.0, spacing=(step, step, step))
    return v + np.array(lo), f[:, [0, 2, 1]]

MESHES = []
def add(key, v, f, layer, target):
    v, f = simplify(v, f, target)
    MESHES.append((key, to_three(v), f, layer)); print(key, layer, len(v), len(f))

# glándulas de BodyParts3D
for key, c, t in [('hypothalamus', 'FMA62008', 4000), ('pituitary', 'FMA13889', 3000), ('pineal', 'FMA62033', 1500),
                  ('thymus', 'FMA9607', 4000), ('adrenalR', 'FMA15629', 3000), ('adrenalL', 'FMA15630', 3000),
                  ('pancreas', 'FMA7198', 6000), ('testisR', 'FMA7211', 2500), ('testisL', 'FMA7212', 2500)]:
    add(key, *concept(c), 'gland', t)

# tiroides y paratiroides esquemáticas sobre la tráquea y el cricoides reales (coordenadas de BodyParts3D)
tv, _ = concept('FMA7394'); cv, _ = concept('FMA9615')
cric_low = cv[:, 2].min()
ring = tv[(tv[:, 2] < cric_low - 5) & (tv[:, 2] > cric_low - 45)]
cx, cy = ring[:, 0].mean(), ring[:, 1].mean(); rad = np.percentile(np.hypot(ring[:, 0] - cx, ring[:, 1] - cy), 90)
zc = cric_low - 22                                    # centro de los lóbulos: anillos traqueales 2–5
lobes = [((cx + s * (rad + 8), cy - 5, zc), (9, 9, 24), 0.55) for s in (-1, 1)]
isth = [((cx, cy - rad - 2.5, zc - 8), (rad + 6, 3.2, 6.5), 0.0)]
lo = (cx - rad - 25, cy - rad - 15, zc - 30); hi = (cx + rad + 25, cy + rad + 15, zc + 35)
v, f = sdf_mesh(lobes + isth, lo, hi); add('thyroid', v, f, 'gland', 5000)
pts = []
for s in (-1, 1):
    for dz in (14, -16):
        pts.append(((cx + s * (rad + 9), cy + 6, zc + dz), (3.0, 2.0, 3.6), 0.0))
v, f = sdf_mesh(pts, lo, hi, 0.3); add('parathyroid', v, f, 'gland', 2000)

# contexto anatómico
add('skin', *concept('FMA7163'), 'skin', 26000)
add('skeleton', *concept('FMA46565', 'FMA13478', 'FMA7480', 'FMA7485', 'FMA9578'), 'bone', 45000)
add('brain', *concept('FMA50801'), 'organ', 12000)
for key, cs, t in [('heart', ['FMA7088'], 6000), ('lungR', ['FMA7309'], 5000), ('lungL', ['FMA7310'], 5000), ('liver', ['FMA7197'], 6000),
                   ('stomach', ['FMA7148'], 4000), ('duodenum', ['FMA7206'], 3000), ('kidneyR', ['FMA7204'], 4000), ('kidneyL', ['FMA7205'], 4000),
                   ('aorta', ['FMA3734'], 5000), ('ivc', ['FMA10951'], 3000), ('trachea', ['FMA7394'], 3000), ('esophagus', ['FMA7131'], 2500),
                   ('larynx', ['FMA55099', 'FMA9615'], 3000)]:
    add(key, *concept(*cs), 'organ', t)

# empaquetado: posiciones int16 en décimas de mm respecto al centro, índices uint16/uint32
allv = np.concatenate([m[1] for m in MESHES if m[3] == 'gland'])
C = (allv.min(0) + allv.max(0)) / 2
parts, index, off = [], {}, 0
def blob(name, arr):
    global off
    b = np.ascontiguousarray(arr).tobytes(); pad = (-off) % 4
    if pad: parts.append(b'\0' * pad); off += pad
    index[name] = [off, str(arr.dtype), list(arr.shape)]; parts.append(b); off += len(b)
meshes = []
for key, v, f, layer in MESHES:
    q = np.round((v - C) * 10).astype(np.int16)
    blob(key + '_pos', q); blob(key + '_idx', f.astype(np.uint16 if len(v) < 65535 else np.uint32))
    meshes.append({'key': key, 'layer': layer, 'cen': [round(float(x), 1) for x in (v.mean(0) - C)]})
os.makedirs(f'{ROOT}/endo/build', exist_ok=True)
open(f'{ROOT}/endo/build/endo.bin.gz', 'wb').write(gzip.compress(b''.join(parts), 9))
json.dump({'index': index, 'meshes': meshes, 'center_mm': [round(float(x), 1) for x in C],
           'source': 'BodyParts3D 4.0, © The Database Center for Life Science, CC BY 4.0; tiroides y paratiroides esquemáticas'},
          open(f'{ROOT}/endo/build/endo.json', 'w'))
print('gz', os.path.getsize(f'{ROOT}/endo/build/endo.bin.gz'))
