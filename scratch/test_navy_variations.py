import os
from PIL import Image
import colorsys

def create_variations():
    base = Image.open(r"frontend\src\assets\logo.png").convert("RGBA")
    w, h = base.size

    # AMARAVATI region: x in [344, 992], y in [95, 178]
    # Variation 1: Solid Brand Navy (#082B4C = 8, 43, 76)
    v1 = base.copy()
    p1 = v1.load()
    for y in range(95, 178):
        for x in range(344, 992):
            r, g, b, a = p1[x, y]
            if a > 0:
                p1[x, y] = (8, 43, 76, a)
    v1.save(r"scratch\amaravati_v1_solid_navy.png")

    # Variation 2: Vertical metallic Navy gradient (#12538f at top -> #082b4c at mid -> #051a30 at bottom)
    v2 = base.copy()
    p2 = v2.load()
    y_min, y_max = 95, 174
    for y in range(95, 178):
        # Progress from 0 (top) to 1 (bottom)
        t = min(1.0, max(0.0, (y - y_min) / float(y_max - y_min)))
        # Top: (18, 80, 130), Mid: (8, 43, 76), Bottom: (4, 22, 42)
        if t < 0.5:
            # interpolate top to mid
            st = t / 0.5
            gr = int(round(18 * (1 - st) + 8 * st))
            gg = int(round(80 * (1 - st) + 43 * st))
            gb = int(round(130 * (1 - st) + 76 * st))
        else:
            # interpolate mid to bottom
            st = (t - 0.5) / 0.5
            gr = int(round(8 * (1 - st) + 4 * st))
            gg = int(round(43 * (1 - st) + 22 * st))
            gb = int(round(76 * (1 - st) + 42 * st))

        for x in range(344, 992):
            r, g, b, a = p2[x, y]
            if a > 0:
                # If edge pixel (a < 255), color is (gr, gg, gb) with alpha a
                # If inside pixel, add subtle original surface contrast
                p2[x, y] = (gr, gg, gb, a)
    v2.save(r"scratch\amaravati_v2_gradient_navy.png")

    # Variation 3: Luminance-preserved Navy Blue
    # Preserves the 3D specular shine / bevel from original letters while replacing all color with Navy
    v3 = base.copy()
    p3 = v3.load()
    # Reference navy: (8, 43, 76), in HSL hue ~ 209 deg, saturation ~ 0.81
    navy_hue = 209.0 / 360.0
    navy_sat = 0.82
    for y in range(95, 178):
        for x in range(344, 992):
            r, g, b, a = p3[x, y]
            if a > 0:
                # Calculate relative luminance
                lum = 0.299 * r + 0.587 * g + 0.114 * b
                # Map lum (typically 15 to 130) to navy lightness (0.10 to 0.40)
                lightness = min(0.48, max(0.10, lum / 255.0 * 0.85 + 0.08))
                # Convert back to RGB
                nr, ng, nb = colorsys.hls_to_rgb(navy_hue, lightness, navy_sat)
                p3[x, y] = (int(round(nr * 255)), int(round(ng * 255)), int(round(nb * 255)), a)
    v3.save(r"scratch\amaravati_v3_lum_navy.png")

    print("Created 3 variations in scratch/")

if __name__ == "__main__":
    create_variations()

