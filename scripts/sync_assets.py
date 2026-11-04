import os
import re
import shutil

active_assets = set()
for root, dirs, files in os.walk('frontend/dist'):
    for f in files:
        if f.endswith('.html'):
            with open(os.path.join(root, f), 'r', encoding='utf-8') as hf:
                for m in re.findall(r'/assets/([a-zA-Z0-9_\-\.]+)', hf.read()):
                    active_assets.add(m)

checked = set()
to_check = set([a for a in active_assets if a.endswith('.js')])

while to_check:
    cur = to_check.pop()
    checked.add(cur)
    p = os.path.join('frontend/dist/assets', cur)
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8', errors='ignore') as jf:
            for m in re.findall(r'["\'](?:\./)?([a-zA-Z0-9_\-\.]+\.(?:js|css|png|jpg))["\']', jf.read()):
                if os.path.exists(os.path.join('frontend/dist/assets', m)):
                    active_assets.add(m)
                    if m.endswith('.js') and m not in checked:
                        to_check.add(m)

dist_assets = 'frontend/dist/assets'
for f in os.listdir(dist_assets):
    if (f.endswith('.js') or f.endswith('.css')) and f not in active_assets:
        try:
            os.remove(os.path.join(dist_assets, f))
        except Exception as e:
            print(f"Error removing {f}: {e}")

pub_assets = 'frontend/.output/public/assets'
for f in os.listdir(pub_assets):
    if (f.endswith('.js') or f.endswith('.css')) and not os.path.exists(os.path.join(dist_assets, f)):
        try:
            os.remove(os.path.join(pub_assets, f))
        except Exception as e:
            print(f"Error removing {f}: {e}")

for f in os.listdir(dist_assets):
    src = os.path.join(dist_assets, f)
    dst = os.path.join(pub_assets, f)
    if not os.path.exists(dst):
        shutil.copy2(src, dst)

print(f"Assets synced and pruned. Total active assets: {len(active_assets)}")
