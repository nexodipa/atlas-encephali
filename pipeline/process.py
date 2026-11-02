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

SURF = {}
SURF_F = {}
for hemi, nlname in (('lh', 'left'), ('rh', 'right')):
    sl = slice(0, 10242) if hemi == 'lh' else slice(10242, 20484)
    pial = nib.load(NL + f'pial_{nlname}.gii.gz')
    v = pial.darrays[0].data.astype(np.float64); f = pial.darrays[1].data.astype(np.int64)
    infl = nib.load(NL + f'infl_{nlname}.gii.gz').darrays[0].data.astype(np.float64)
    sulc = nib.load(NL + f'sulc_{nlname}.gii.gz').darrays[0].data
    v = to152(v)
    white152 = to152(nib.load(NL + f'white_{nlname}.gii.gz').darrays[0].data.astype(np.float64))
    SURF[hemi] = (v.copy(), white152, aparc[sl].copy())
    SURF_F[hemi] = f.copy()
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

# ---- CerebrA (licencia permisiva MNI) para núcleos, ventrículos y tronco ----
cer = nib.load('data-atlas/human/CerebrA.nii.gz')
cd0 = np.asarray(cer.dataobj).astype(int)
cnames = {}
for line in open('data-atlas/human/CerebrA.txt'):
    p = line.split()
    if len(p) >= 2: cnames[p[1]] = int(p[0])
def cl(*names): return [cnames[n] for n in names]
GROUPS = {
  'Lthal': cl('Left_Thalamus'), 'Rthal': cl('Right_Thalamus'),
  'Lcaud': cl('Left_Caudate'), 'Rcaud': cl('Right_Caudate'),
  'Lput': cl('Left_Putamen'), 'Rput': cl('Right_Putamen'),
  'Lpal': cl('Left_Pallidum'), 'Rpal': cl('Right_Pallidum'),
  'Laccumb': cl('Left_Accumbens_Area'), 'Raccumb': cl('Right_Accumbens_Area'),
  'Lhippo': cl('Left_Hippocampus'), 'Rhippo': cl('Right_Hippocampus'),
  'Lamyg': cl('Left_Amygdala'), 'Ramyg': cl('Right_Amygdala'),
  'Lvent': cl('Left_Lateral_Ventricle', 'Left_Inferior_Lateral_Ventricle'),
  'Rvent': cl('Right_Lateral_Ventricle', 'Right_Inferior_Lateral_Ventricle'),
  'v3': cl('Left_Third_Ventricle', 'Right_Third_Ventricle'),
  'v4': cl('Left_Fourth_Ventricle', 'Right_Fourth_Ventricle'),
  'stem': cl('Left_Brainstem', 'Right_Brainstem'),
  'Lbf': cl('Left_Basal_Forebrain'), 'Rbf': cl('Right_Basal_Forebrain'),
  'chiasm': cl('Left_Optic_Chiasm', 'Right_Optic_Chiasm'),
}
# corrige lateralidad por centroide (los nombres izquierda/derecha pueden venir invertidos)
for k in list(GROUPS):
    if k[0] in 'LR' and k[1:] and (('R'+k[1:]) in GROUPS):
        pass
fixed = {}
for k, labs in GROUPS.items():
    if k[0] in 'LR' and ('L' + k[1:]) in GROUPS and ('R' + k[1:]) in GROUPS:
        c = nib.affines.apply_affine(cer.affine, np.argwhere(np.isin(cd0, labs))).mean(0)
        side = 'L' if c[0] < 0 else 'R'
        fixed[side + k[1:]] = labs
    else:
        fixed[k] = labs
GROUPS = fixed
deep = []
MASKXYZ = {}
def emit(key, mask, affine, target, sigma=0.9, labfn=None, upsample=1):
    MASKXYZ[key] = nib.affines.apply_affine(affine, np.argwhere(mask))
    if upsample > 1:
        mask = ndimage.zoom(mask.astype(np.float32), upsample, order=1) > 0.5
        affine = affine.copy(); affine[:3, :3] = affine[:3, :3] / upsample
    xyz, faces, _ = mesh_from_mask(mask, affine, sigma * upsample, target)
    faces = orient_out(xyz, faces)
    add(f'deep_{key}_pos', qverts(ras2three(xyz))); add(f'deep_{key}_idx', faces[:, [0, 2, 1]].astype(np.uint16))
    if labfn is not None: add(f'deep_{key}_lab', labfn(xyz))
    deep.append(key)
    print(key, len(xyz), len(faces), xyz.mean(0).round(1))
for key, labs in GROUPS.items():
    tgt = 5000 if key == 'stem' else (1600 if key in ('v3', 'v4', 'chiasm') or key[1:] in ('bf', 'accumb') else 2600)
    lf = None
    if key == 'stem':
        lf = lambda xyz: np.where(xyz[:, 2] > -14, 0, np.where(xyz[:, 2] > -38, 1, 2)).astype(np.uint8)
    emit(key, np.isin(cd0, labs), cer.affine, tgt, 0.8 if key in ('v3', 'v4', 'chiasm') else 0.9, lf)

# ---- CIT168 (CC BY 4.0): núcleos del mesencéfalo y diencéfalo ----
cit = nib.load('niivue-demo-images/CIT168/CIT168.nii.gz')
cdat = np.asarray(cit.dataobj)
CIT = {'snc': 13, 'snr': 17, 'vta': 21, 'rn': 15, 'stn': 31, 'hth': 27, 'hab': 25, 'mam': 29}
for k, li in CIT.items():
    for side, off in (('L', 0), ('R', 1)):
        lab = li + off
        prob = np.where(cdat['R'] == lab, cdat['B'], 0).astype(np.float32) + np.where(cdat['G'] == lab, cdat['A'], 0)
        m = prob >= 70
        if m.sum() < 3: m = prob >= 30
        c = nib.affines.apply_affine(cit.affine, np.argwhere(m)).mean(0)
        sd = 'L' if c[0] < 0 else 'R'
        emit(sd + k, m, cit.affine, 900, 0.6, upsample=2)
meta['deep'] = deep

# ---- Tractos de sustancia blanca (atlas HCP842, Yeh y cols., 2018) ----
tr = nib.load('data-atlas/human/HCP842_tractography.nii.gz')
tnames = [l.split('\t')[1].strip() for l in open('data-atlas/human/HCP842_tractography.txt') if '\t' in l]
SKIP = {'U_Fiber_L', 'U_Fiber_R', 'Cerebellum_L', 'Cerebellum_R', 'Vermis'}
allv = []; allf = []; allt = []; tract_meta = []; voff = 0
for ti, nm in enumerate(tnames):
    if nm in SKIP: continue
    m = np.asarray(tr.dataobj[..., ti]) > 0
    if nm == 'Corpus_Callosum':
        m = m | m[::-1]
        xs = nib.affines.apply_affine(tr.affine, np.stack(np.meshgrid(np.arange(m.shape[0]), [0], [0], indexing='ij'), -1).reshape(-1, 3))[:, 0]
        m = m & (np.abs(xs) <= 7)[:, None, None]
        zs = np.arange(m.shape[2]) * tr.affine[2, 2] + tr.affine[2, 3]
        m = m & (zs <= 33)[None, None, :]
        lab_, n_ = ndimage.label(m); m = lab_ == (np.bincount(lab_.ravel())[1:].argmax() + 1)
    if m.sum() < 20: continue
    xyz, faces, _ = mesh_from_mask(m, tr.affine, 0.7, 1400 if nm != 'Corpus_Callosum' else 3000)
    faces = orient_out(xyz, faces)
    allv.append(xyz); allf.append(faces + voff); allt.append(np.full(len(xyz), len(tract_meta), np.uint8))
    tract_meta.append(nm); voff += len(xyz)
V = np.concatenate(allv); Fc = np.concatenate(allf); Tt = np.concatenate(allt)
print('tracts', len(tract_meta), len(V), len(Fc))
add('tr_pos', qverts(ras2three(V))); add('tr_idx', Fc[:, [0, 2, 1]].astype(np.uint16)); add('tr_id', Tt)
meta['tracts'] = tract_meta

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
    deep.append(key)
meta['cb_names'] = [r[1] for r in csv.reader(open('ca/Diedrichsen_2009/atl-Anatom.tsv'), delimiter='\t')][1:]


# ---- Mapas PET de receptores (Hansen y cols., 2022; CC BY-NC-SA 4.0) ----
from scipy.ndimage import map_coordinates
RECS = [('D1','D1_SCH23390_hc13_kaller.nii'),('D2','D2_fallypride_hc49_jaworska.nii'),('DAT','DAT_fpcit_hc174_dukart_spect.nii'),('FDOPA','FDOPA_fluorodopa_hc12_gomez.nii'),
 ('5HT1a','5HT1a_way_hc36_savli.nii'),('5HT1b','5HT1b_p943_hc65_gallezot.nii.gz'),('5HT2a','5HT2a_cimbi_hc29_beliveau.nii'),('5HT4','5HT4_sb20_hc59_beliveau.nii'),('5HT6','5HT6_gsk_hc30_radhakrishnan.nii.gz'),('SERT','5HTT_dasb_hc100_beliveau.nii'),
 ('NET','NAT_MRB_hc77_ding.nii.gz'),('A4B2','A4B2_flubatine_hc30_hillmer.nii.gz'),('M1','M1_lsn_hc24_naganawa.nii.gz'),('VAChT','VAChT_feobv_hc18_aghourian_sum.nii'),
 ('GABAa','GABAa-bz_flumazenil_hc16_norgaard.nii'),('NMDA','NMDA_ge179_hc29_galovic.nii.gz'),('mGluR5','mGluR5_abp_hc73_smart.nii'),('MOR','MU_carfentanil_hc204_kantonen.nii'),('CB1','CB1_omar_hc77_normandin.nii.gz'),('H3','H3_cban_hc8_gallezot.nii.gz')]
rec_meta = {}
def samp(img, dat, xyz):
    ijk = nib.affines.apply_affine(np.linalg.inv(img.affine), xyz).T
    return map_coordinates(dat, ijk, order=1, mode='nearest')
for key, fn in RECS:
    img = nib.load('hr/data/PET_nifti_images/' + fn)
    dat = np.nan_to_num(np.asarray(img.dataobj, dtype=np.float32).squeeze())
    if dat.ndim == 4: dat = dat[..., 0]
    vals = {}
    for hemi in ('lh', 'rh'):
        p, w, a = SURF[hemi]
        acc = np.zeros(len(p))
        for t in (0.3, 0.5, 0.7): acc += samp(img, dat, w + (p - w) * t)
        vals[hemi] = acc / 3
        # suavizado en la malla (promedio con vecinos) para reducir ruido de muestreo
        import scipy.sparse as sp
        fcs = SURF_F[hemi]; n = len(p)
        Adj = sp.coo_matrix((np.ones(fcs.size * 2), (np.r_[fcs[:, 0], fcs[:, 1], fcs[:, 2], fcs[:, 1], fcs[:, 2], fcs[:, 0]], np.r_[fcs[:, 1], fcs[:, 2], fcs[:, 0], fcs[:, 0], fcs[:, 1], fcs[:, 2]])), shape=(n, n)).tocsr()
        Adj.data[:] = 1; deg = np.asarray(Adj.sum(1)).ravel()
        for _ in range(4): vals[hemi] = 0.5 * vals[hemi] + 0.5 * (Adj @ vals[hemi]) / deg
    allc = np.concatenate([vals['lh'][SURF['lh'][2] > 0], vals['rh'][SURF['rh'][2] > 0]])
    lo, hi = np.percentile(allc, [2, 98])
    for hemi in ('lh', 'rh'):
        q = np.clip((vals[hemi] - lo) / (hi - lo + 1e-9), 0, 1)
        add(f'rec_{key}_{hemi}', np.round(q * 255).astype(np.uint8))
    deepv = {}
    for k, xyz in MASKXYZ.items():
        if 'vent' in k or k in ('v3', 'v4', 'chiasm'): continue
        sub = xyz[::max(1, len(xyz) // 400)]
        deepv[k] = float(np.mean(samp(img, dat, sub)))
    cmed = float(np.median(allc))
    dmax = max(deepv.values())
    rec_meta[key] = {'file': fn, 'deep': {k: round(v / dmax, 3) for k, v in deepv.items()}, 'deep_vs_ctx': round(dmax / (cmed + 1e-9), 2)}
    print(key, 'deep max/cortex median', rec_meta[key]['deep_vs_ctx'])
meta['receptors'] = rec_meta


# ---- Volumen para cortes seccionales (plantilla MNI ICBM152 2009, 2 mm) ----
from scipy.ndimage import map_coordinates as _mc
T1 = nib.load('/usr/local/lib/python3.13/site-packages/nilearn/datasets/data/mni_icbm152_t1_tal_nlin_sym_09a_converted.nii.gz')
gx = np.arange(-90, 91, 2); gy = np.arange(-126, 91, 2); gz = np.arange(-72, 109, 2)
X, Y, Z = np.meshgrid(gx, gy, gz, indexing='ij'); P = np.stack([X.ravel(), Y.ravel(), Z.ravel()], 1).astype(np.float64)
def samp_vol(img, dat, order):
    ijk = nib.affines.apply_affine(np.linalg.inv(img.affine), P).T
    return _mc(dat, ijk, order=order, mode='constant', cval=0).reshape(X.shape)
t1 = samp_vol(T1, np.asarray(T1.dataobj, dtype=np.float32), 1)
t1 = np.clip(t1 / np.percentile(t1[t1 > 0], 99.5) * 255, 0, 255).astype(np.uint8)
cer2 = nib.load('data-atlas/human/CerebrA.nii.gz')
lab = samp_vol(cer2, np.asarray(cer2.dataobj).astype(np.float32), 0).astype(np.uint8)
# tractos: para cada vóxel, el tracto más específico (de menor volumen) que lo contiene
trv = nib.load('data-atlas/human/HCP842_tractography.nii.gz'); tid_v = np.zeros(X.shape, np.uint8); best = np.full(X.shape, 1e12)
for ti, nm in enumerate(tnames):
    if nm in SKIP or nm not in tract_meta: continue
    m3 = np.asarray(trv.dataobj[..., ti]).astype(np.float32)
    vol = m3.sum()
    if nm == 'Corpus_Callosum': vol = 1e11
    sm = samp_vol(trv, m3, 0) > 0.5
    upd = sm & (vol < best); tid_v[upd] = tract_meta.index(nm) + 1; best[upd] = vol
# orden de los ejes en el archivo: x (91), y (109), z (91), con x más rápido al aplanar en orden 'F'
add('vol_t1', np.ascontiguousarray(t1.transpose(2, 1, 0)))
add('vol_lab', np.ascontiguousarray(lab.transpose(2, 1, 0)))
add('vol_tr', np.ascontiguousarray(tid_v.transpose(2, 1, 0)))
meta['vol'] = {'dims': [len(gx), len(gy), len(gz)], 'origin': [-90, -126, -72], 'step': 2,
  'cerebra': {int(l.split()[0]): l.split()[1] for l in open('data-atlas/human/CerebrA.txt') if l.strip()}}
print('vol', t1.shape, (lab > 0).sum(), (tid_v > 0).sum())

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
