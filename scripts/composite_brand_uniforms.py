import os
import colorsys
from PIL import Image, ImageDraw, ImageFilter

def main():
    logo_path = r'C:\Users\DELL\.gemini\antigravity\brain\7cecb2a3-82de-4c76-974c-3d57eb893078\.user_uploaded\media_1793721853435_0e228a2a.png'
    assets_dir = r'frontend/src/assets'

    print('Loading official logo from:', logo_path)
    logo = Image.open(logo_path).convert('RGBA')

    # 1. Extract emblem and text lines
    # Emblem is (12, 12, 309, 295)
    emblem = logo.crop((12, 12, 309, 295))
    
    # Text area (320..1010)
    text_area = logo.crop((320, 12, 1010, 295))
    
    # Line 1: 'AMARAVATI'
    l1_raw = text_area.crop((0, 75, text_area.width, 145))
    l1_bbox = l1_raw.getbbox()
    l1_navy = l1_raw.crop(l1_bbox)
    
    # Convert Line 1 to pure white
    l1_white = Image.new('RGBA', l1_navy.size, (255, 255, 255, 0))
    l1_white.putalpha(l1_navy.split()[3])

    # Line 2: 'SOLAR SOLUTIONS'
    l2_raw = text_area.crop((0, 160, text_area.width, 210))
    l2_bbox = l2_raw.getbbox()
    l2_navy = l2_raw.crop(l2_bbox)
    
    # Convert Line 2 to pure white
    l2_white = Image.new('RGBA', l2_navy.size, (255, 255, 255, 0))
    l2_white.putalpha(l2_navy.split()[3])

    # 2. Build Official Chest Badge (Circular Navy Patch with Gold Rim)
    circ_size = 600
    chest_badge = Image.new('RGBA', (circ_size, circ_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(chest_badge)
    
    # Outer dark navy background with gold border
    draw.ellipse([8, 8, circ_size - 8, circ_size - 8], fill=(7, 30, 61, 235), outline=(230, 160, 20, 255), width=8)
    draw.ellipse([18, 18, circ_size - 18, circ_size - 18], outline=(255, 220, 100, 200), width=3)

    # 3D Golden lightning bolt & cyan orbit swoosh emblem
    c_em_w = 340
    c_em_h = int(emblem.height * (c_em_w / emblem.width))
    c_em = emblem.resize((c_em_w, c_em_h), Image.Resampling.LANCZOS)
    chest_badge.paste(c_em, ((circ_size - c_em_w) // 2, 60), c_em)

    # Text Line 1: 'AMARAVATI'
    c_l1_w = 420
    c_l1_h = int(l1_white.height * (c_l1_w / l1_white.width))
    c_l1 = l1_white.resize((c_l1_w, c_l1_h), Image.Resampling.LANCZOS)
    chest_badge.paste(c_l1, ((circ_size - c_l1_w) // 2, 60 + c_em_h + 18), c_l1)

    # Text Line 2: 'SOLAR SOLUTIONS'
    c_l2_w = 380
    c_l2_h = int(l2_white.height * (c_l2_w / l2_white.width))
    c_l2 = l2_white.resize((c_l2_w, c_l2_h), Image.Resampling.LANCZOS)
    chest_badge.paste(c_l2, ((circ_size - c_l2_w) // 2, 60 + c_em_h + 18 + c_l1_h + 12), c_l2)

    # 3. Build Official Back Badge for Step 3
    back_w, back_h = 1000, 800
    back_badge = Image.new('RGBA', (back_w, back_h), (0, 0, 0, 0))

    b_em_w = 520
    b_em_h = int(emblem.height * (b_em_w / emblem.width))
    b_em = emblem.resize((b_em_w, b_em_h), Image.Resampling.LANCZOS)
    back_badge.paste(b_em, ((back_w - b_em_w) // 2, 40), b_em)

    b_l1_w = 760
    b_l1_h = int(l1_white.height * (b_l1_w / l1_white.width))
    b_l1 = l1_white.resize((b_l1_w, b_l1_h), Image.Resampling.LANCZOS)
    back_badge.paste(b_l1, ((back_w - b_l1_w) // 2, 40 + b_em_h + 30), b_l1)

    b_l2_w = 720
    b_l2_h = int(l2_white.height * (b_l2_w / l2_white.width))
    b_l2 = l2_white.resize((b_l2_w, b_l2_h), Image.Resampling.LANCZOS)
    back_badge.paste(b_l2, ((back_w - b_l2_w) // 2, 40 + b_em_h + 30 + b_l1_h + 20), b_l2)

    bbox_back = back_badge.getbbox()
    back_badge = back_badge.crop(bbox_back)

    # 4. Build Helmet Logo Sticker (crisp horizontal logo with white background badge)
    hw, hh = 400, 120
    helmet_sticker = Image.new('RGBA', (hw, hh), (0, 0, 0, 0))
    hdraw = ImageDraw.Draw(helmet_sticker)
    # subtle rounded white backplate for helmet
    hdraw.rounded_rectangle([2, 2, hw - 2, hh - 2], radius=16, fill=(255, 255, 255, 230), outline=(200, 205, 210, 255), width=2)
    
    # paste original logo inside
    log_w = 360
    log_h = int(logo.height * (log_w / logo.width))
    log_scaled = logo.resize((log_w, log_h), Image.Resampling.LANCZOS)
    helmet_sticker.paste(log_scaled, ((hw - log_w) // 2, (hh - log_h) // 2), log_scaled)

    # Target #B83A16 HLS
    target_r, target_g, target_b = 184 / 255.0, 58 / 255.0, 22 / 255.0
    target_h, target_l, target_s = colorsys.rgb_to_hls(target_r, target_g, target_b)

    def grade_shirt(im, x1, y1, x2, y2, max_hue=35.0, min_hue=340.0, skin_box=None):
        pixels = im.load()
        w, h = im.size
        for y in range(max(0, y1), min(h, y2)):
            for x in range(max(0, x1), min(w, x2)):
                if skin_box and (skin_box[0] <= x <= skin_box[2] and skin_box[1] <= y <= skin_box[3]):
                    continue
                r, g, b = pixels[x, y]
                rf, gf, bf = r / 255.0, g / 255.0, b / 255.0
                h_val, l_val, s_val = colorsys.rgb_to_hls(rf, gf, bf)
                h_deg = h_val * 360.0
                
                is_shirt = (h_deg <= max_hue or h_deg >= min_hue) and s_val > 0.16 and 0.05 < l_val < 0.75 and rf > bf * 1.25
                if is_shirt:
                    new_h = target_h
                    new_s = min(0.92, max(target_s * 0.85, s_val * 1.2))
                    adj_l = l_val
                    if adj_l > 0.45:
                        adj_l = 0.45 + (adj_l - 0.45) * 0.75
                    new_r, new_g, new_b = colorsys.hls_to_rgb(new_h, adj_l, new_s)
                    pixels[x, y] = (int(new_r * 255), int(new_g * 255), int(new_b * 255))

    def paste_badge(im, badge, cx, cy, diameter, angle=0):
        w = diameter
        h = int(badge.height * (w / badge.width))
        b_scaled = badge.resize((w, h), Image.Resampling.LANCZOS)
        if angle != 0:
            b_scaled = b_scaled.rotate(angle, Image.Resampling.BICUBIC, expand=True)
        im_rgba = im.convert('RGBA')
        px = int(cx - b_scaled.width // 2)
        py = int(cy - b_scaled.height // 2)
        im_rgba.paste(b_scaled, (px, py), b_scaled)
        return im_rgba.convert('RGB')

    print('\n--- Processing 1. process-step-1-consultation.jpg ---')
    p1 = os.path.join(assets_dir, 'process-step-1-consultation.jpg')
    im1 = Image.open(p1).convert('RGB')
    grade_shirt(im1, 70, 270, 440, 600, max_hue=35.0, skin_box=(280, 420, 390, 520))
    im1 = paste_badge(im1, chest_badge, 260, 360, diameter=82, angle=2)
    im1.save(p1, quality=96)
    print('Saved Step 1 Consultation successfully.')

    print('\n--- Processing 2. process-step-2-inspection.jpg ---')
    p2 = os.path.join(assets_dir, 'process-step-2-inspection.jpg')
    im2 = Image.open(p2).convert('RGB')
    grade_shirt(im2, 530, 240, 850, 620, max_hue=35.0, skin_box=(680, 440, 780, 540))
    im2 = paste_badge(im2, chest_badge, 695, 268, diameter=78, angle=-3)
    im2 = paste_badge(im2, helmet_sticker, 700, 154, diameter=54, angle=0)
    im2.save(p2, quality=96)
    print('Saved Step 2 Inspection successfully.')

    print('\n--- Processing 3. process-step-3-design.jpg ---')
    p3 = os.path.join(assets_dir, 'process-step-3-design.jpg')
    im3 = Image.open(p3).convert('RGB')
    pix3 = im3.load()
    # Inpaint old print
    for y in range(265, 510):
        ref_col = pix3[545, y]
        rf, gf, bf = ref_col[0] / 255.0, ref_col[1] / 255.0, ref_col[2] / 255.0
        h, l, s = colorsys.rgb_to_hls(rf, gf, bf)
        new_r, new_g, new_b = colorsys.hls_to_rgb(target_h, max(0.15, min(0.65, l)), target_s)
        clean_rgb = (int(new_r * 255), int(new_g * 255), int(new_b * 255))
        for x in range(565, 815):
            r, g, b = pix3[x, y]
            is_print = (r > 175 and g > 165) or (b > r + 15 and b > 90) or (r > 160 and g > 115 and b < 85)
            if is_print:
                pix3[x, y] = clean_rgb
    # Grade entire shirt
    grade_shirt(im3, 480, 220, 920, 760, max_hue=35.0)
    # Paste back badge
    im3 = paste_badge(im3, back_badge, 691, 389, diameter=240, angle=0)
    im3.save(p3, quality=96)
    print('Saved Step 3 Design successfully.')

    print('\n--- Processing 4. process-step-4-installation.jpg ---')
    p4 = os.path.join(assets_dir, 'process-step-4-installation.jpg')
    im4 = Image.open(p4).convert('RGB')
    grade_shirt(im4, 760, 180, 1080, 580, max_hue=35.0)
    grade_shirt(im4, 1060, 200, 1370, 580, max_hue=52.0) # includes tan/light orange
    im4 = paste_badge(im4, chest_badge, 1054, 264, diameter=70, angle=-4)
    im4 = paste_badge(im4, chest_badge, 1157, 300, diameter=65, angle=2)
    im4.save(p4, quality=96)
    print('Saved Step 4 Installation successfully.')

    print('\n--- Processing 5. installation.jpg ---')
    p5 = os.path.join(assets_dir, 'installation.jpg')
    im5 = Image.open(p5).convert('RGB')
    grade_shirt(im5, 120, 290, 640, 768, max_hue=38.0)
    grade_shirt(im5, 720, 400, 1320, 768, max_hue=38.0)
    im5 = paste_badge(im5, chest_badge, 569, 421, diameter=85, angle=-2)
    im5 = paste_badge(im5, chest_badge, 1123, 580, diameter=82, angle=3)
    im5 = paste_badge(im5, helmet_sticker, 327, 195, diameter=58, angle=-5)
    im5 = paste_badge(im5, helmet_sticker, 806, 318, diameter=54, angle=15)
    im5.save(p5, quality=96)
    print('Saved installation.jpg successfully.')

    print('\nAll 5 images processed and saved to frontend/src/assets!')

if __name__ == '__main__':
    main()

