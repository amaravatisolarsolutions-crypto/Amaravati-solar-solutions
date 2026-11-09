import os
from PIL import Image, ImageFilter
import numpy as np
from collections import deque

def generate_favicons():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    logo_path = os.path.join(base_dir, 'frontend', 'public', 'logo-original.jpg')
    
    if not os.path.exists(logo_path):
        raise FileNotFoundError(f"Logo not found at {logo_path}")

    print(f"Loading logo from {logo_path}...")
    im = Image.open(logo_path)
    
    # 1. Detect non-white bounding box for the emblem (left side of logo)
    arr = np.array(im)
    # Mask where any channel < 248 within the first 340 columns
    mask = np.any(arr[:, :340, :3] < 248, axis=2)
    y_indices, x_indices = np.where(mask)
    ymin, ymax = y_indices.min(), y_indices.max()
    xmin, xmax = x_indices.min(), x_indices.max()
    
    print(f"Detected emblem bbox: ({xmin}, {ymin}) to ({xmax}, {ymax}) -> {xmax - xmin}x{ymax - ymin}")
    emblem = im.crop((xmin, ymin, xmax + 1, ymax + 1))
    ew, eh = emblem.size
    
    # 2. Create 512x512 canvas and paste emblem centered with ~86% coverage (440px)
    target_dim = 440
    scale = target_dim / max(ew, eh)
    nw, nh = int(ew * scale), int(eh * scale)
    emblem_resized = emblem.resize((nw, nh), Image.Resampling.LANCZOS)
    
    white_canvas = Image.new('RGB', (512, 512), (255, 255, 255))
    paste_x = (512 - nw) // 2
    paste_y = (512 - nh) // 2
    white_canvas.paste(emblem_resized, (paste_x, paste_y))
    
    # 3. Create clean alpha mask using flood fill from edges (preserves internal sunburst/specular highlights)
    w_arr = np.array(white_canvas)
    is_white = (w_arr[:, :, 0] > 250) & (w_arr[:, :, 1] > 250) & (w_arr[:, :, 2] > 250)
    
    h, w = is_white.shape
    visited = np.zeros((h, w), dtype=bool)
    queue = deque([(0, 0), (0, w - 1), (h - 1, 0), (h - 1, w - 1)])
    for r, c in queue:
        visited[r, c] = True
        
    while queue:
        r, c = queue.popleft()
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < h and 0 <= nc < w:
                if not visited[nr, nc] and is_white[nr, nc]:
                    visited[nr, nc] = True
                    queue.append((nr, nc))
                    
    # Visited pixels are external background -> 0 alpha, everything else -> 255
    alpha = np.where(visited, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, 'L')
    alpha_smooth = alpha_img.filter(ImageFilter.GaussianBlur(radius=0.75))
    
    master_512 = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    master_512.paste(white_canvas, (0, 0))
    master_512.putalpha(alpha_smooth)
    
    # 4. Generate all required favicon sizes
    sizes = {
        'favicon.png': 512,
        'favicon-512x512.png': 512,
        'favicon-192x192.png': 192,
        'favicon-144x144.png': 144,
        'favicon-96x96.png': 96,
        'favicon-48x48.png': 48,
        'apple-touch-icon.png': 180,
    }
    
    # Apple Touch icon often looks best on a clean white background with rounded corner support
    apple_canvas = Image.new('RGBA', (180, 180), (255, 255, 255, 255))
    emb_apple = master_512.resize((150, 150), Image.Resampling.LANCZOS)
    apple_canvas.paste(emb_apple, (15, 15), emb_apple)
    
    # Target directories to save to
    target_dirs = [
        os.path.join(base_dir, 'frontend', 'public'),
        os.path.join(base_dir, 'frontend', 'dist'),
        os.path.join(base_dir, 'frontend', '.output', 'public'),
        base_dir
    ]
    
    for tdir in target_dirs:
        if not os.path.exists(tdir):
            continue
        print(f"\nWriting favicon assets to {tdir}...")
        
        # Save PNG variations
        for fname, s in sizes.items():
            if fname == 'apple-touch-icon.png':
                out_path = os.path.join(tdir, fname)
                apple_canvas.save(out_path, format='PNG')
            else:
                img_s = master_512.resize((s, s), Image.Resampling.LANCZOS)
                out_path = os.path.join(tdir, fname)
                img_s.save(out_path, format='PNG')
            print(f"  ✓ {fname} ({s}x{s})")
            
        # Save multi-size favicon.ico
        ico_path = os.path.join(tdir, 'favicon.ico')
        master_512.save(
            ico_path,
            format='ICO',
            sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
        )
        print(f"  ✓ favicon.ico (multi-resolution 16-256px)")
        
        # Save site.webmanifest
        manifest_content = """{
  "name": "Amaravati Solar Solutions",
  "short_name": "Amaravati Solar",
  "description": "Smart, reliable rooftop solar energy solutions for homes, commercial complexes, and industrial installations across Andhra Pradesh.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#F5A623",
  "icons": [
    {
      "src": "/favicon-48x48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "/favicon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/favicon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/favicon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
"""
        manifest_path = os.path.join(tdir, 'site.webmanifest')
        with open(manifest_path, 'w', encoding='utf-8') as mf:
            mf.write(manifest_content)
        print(f"  ✓ site.webmanifest")

    print("\nFavicon suite generation finished successfully!")

if __name__ == '__main__':
    generate_favicons()

