import os
import math
from PIL import Image
from collections import deque

INPUT_PATH = r"C:\Users\DELL\.gemini\antigravity\brain\7cecb2a3-82de-4c76-974c-3d57eb893078\.user_uploaded\media_1793686476767_a659e724.jpg"
OUTPUT_DIR = r"scratch"

def process_logo():
    img = Image.open(INPUT_PATH).convert("RGB")
    w, h = img.size
    print(f"Loaded image: {w}x{h}")

    # Background seeds: corners, borders, and inside closed letter counters
    # (645, 138) -> 'R' in AMARAVATI
    # (876, 214) -> 'O' in SOLUTIONS (second O)
    # (664, 214) -> 'O' in SOLUTIONS (first O)
    # (410, 214) -> 'O' in SOLAR
    # (547, 209) -> 'R' in SOLAR
    # (500, 212) -> 'A' in SOLAR
    seeds = [
        (0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
        (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2),
        (645, 138),
        (876, 214),
        (664, 214),
        (410, 214),
        (547, 209),
        (500, 212),
    ]

    # Step 1: Flood fill from seeds to identify true background area.
    # We flood fill through pixels where min(r, g, b) >= 238
    bg_visited = set()
    queue = deque()
    for s in seeds:
        if s not in bg_visited and min(img.getpixel(s)) >= 230:
            bg_visited.add(s)
            queue.append(s)

    while queue:
        cx, cy = queue.popleft()
        for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in bg_visited:
                r, g, b = img.getpixel((nx, ny))
                # Stop flood fill if pixel is solid foreground
                if min(r, g, b) >= 238:
                    bg_visited.add((nx, ny))
                    queue.append((nx, ny))

    print(f"Background core pixels identified: {len(bg_visited)}")

    # Step 2: Create RGBA image with smooth matte un-premultiplication
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    pixels_in = img.load()
    pixels_out = out.load()

    # Find boundary pixels within distance 4 of bg_visited
    # For every pixel in the image:
    # If in bg_visited and min(r,g,b) >= 250 -> 100% transparent (alpha = 0)
    # If NOT near bg_visited -> 100% opaque foreground (alpha = 255)
    # If in transition boundary -> compute alpha from deviation from white and de-multiply white

    # First mark distance to bg_visited
    dist_to_bg = {}
    border_queue = deque()
    for pt in bg_visited:
        r, g, b = pixels_in[pt]
        if min(r, g, b) >= 250:
            dist_to_bg[pt] = 0
            border_queue.append(pt)

    # Breadth-first search up to 4 pixels outward into foreground
    while border_queue:
        cx, cy = border_queue.popleft()
        d = dist_to_bg[(cx, cy)]
        if d >= 4:
            continue
        for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in dist_to_bg:
                dist_to_bg[(nx, ny)] = d + 1
                border_queue.append((nx, ny))

    # Construct the final RGBA
    for y in range(h):
        for x in range(w):
            r, g, b = pixels_in[x, y]
            d = dist_to_bg.get((x, y), 999)

            if d == 0:
                # Pure background
                pixels_out[x, y] = (0, 0, 0, 0)
            elif d > 3:
                # Deep foreground: 100% opaque, untouched RGB!
                pixels_out[x, y] = (r, g, b, 255)
            else:
                # Transition / edge pixel (d = 1, 2, or 3)
                # Compute maximum difference from white across channels
                dr = 255 - r
                dg = 255 - g
                db = 255 - b
                max_d = max(dr, dg, db)

                if max_d <= 4:
                    # JPEG noise on white background -> transparent
                    pixels_out[x, y] = (0, 0, 0, 0)
                else:
                    # Estimate alpha linearly based on coverage
                    alpha_float = min(1.0, max(0.0, (max_d - 2) / 225.0))
                    alpha_int = int(round(alpha_float * 255))

                    if alpha_int <= 0:
                        pixels_out[x, y] = (0, 0, 0, 0)
                    else:
                        # De-multiply white background: F = (C - (1-a)*255) / a
                        a_norm = alpha_int / 255.0
                        fr = int(round(max(0, min(255, (r - (1.0 - a_norm) * 255.0) / a_norm))))
                        fg = int(round(max(0, min(255, (g - (1.0 - a_norm) * 255.0) / a_norm))))
                        fb = int(round(max(0, min(255, (b - (1.0 - a_norm) * 255.0) / a_norm))))
                        pixels_out[x, y] = (fr, fg, fb, alpha_int)

    # Let's inspect the bounding box of non-transparent content
    bbox = out.getbbox()
    print(f"Result bounding box: {bbox}")

    # Crop tightly with comfortable padding (e.g. 12px on all sides)
    pad = 12
    crop_box = (
        max(0, bbox[0] - pad),
        max(0, bbox[1] - pad),
        min(w, bbox[2] + pad),
        min(h, bbox[3] + pad)
    )
    cropped = out.crop(crop_box)
    print(f"Cropped image size: {cropped.size}")

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    raw_path = os.path.join(OUTPUT_DIR, "logo_transparent_raw.png")
    cropped_path = os.path.join(OUTPUT_DIR, "logo_transparent_cropped.png")
    out.save(raw_path, "PNG")
    cropped.save(cropped_path, "PNG")
    print(f"Saved to {raw_path} and {cropped_path}")

    # Verification: Composite over white, black, and navy (#082B4C)
    for bg_name, bg_color in [("white", (255, 255, 255)), ("black", (0, 0, 0)), ("navy", (8, 43, 76))]:
        bg = Image.new("RGB", cropped.size, bg_color)
        bg.paste(cropped, (0, 0), cropped)
        comp_path = os.path.join(OUTPUT_DIR, f"comp_{bg_name}.png")
        bg.save(comp_path, "PNG")
        print(f"Saved composition on {bg_name} to {comp_path}")

if __name__ == "__main__":
    process_logo()
