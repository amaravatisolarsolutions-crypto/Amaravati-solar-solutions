import os
from PIL import Image

def recolor_amaravati_navy():
    # Load the transparent logo
    img_path = r"frontend\src\assets\logo.png"
    img = Image.open(img_path).convert("RGBA")
    w, h = img.size
    pixels = img.load()

    # Brand Navy Blue
    NAVY_R = 8
    NAVY_G = 43
    NAVY_B = 76

    # AMARAVATI region:
    # x in [335, 1005], y in [90, 178]
    recolored_count = 0
    cleaned_noise_count = 0

    # First clean any stray noise in the gap between icon and text (x: 309 to 335, y: 90 to 180)
    for y in range(90, 180):
        for x in range(309, 338):
            r, g, b, a = pixels[x, y]
            if 0 < a < 20:
                pixels[x, y] = (0, 0, 0, 0)
                cleaned_noise_count += 1

    # Recolor AMARAVATI: every pixel in [338, 1005], y in [90, 177] that has alpha > 0
    for y in range(90, 178):
        for x in range(338, min(w, 1005)):
            r, g, b, a = pixels[x, y]
            if a > 0:
                # Set pure uniform Navy Blue with existing anti-aliased alpha
                pixels[x, y] = (NAVY_R, NAVY_G, NAVY_B, a)
                recolored_count += 1

    print(f"Recolored {recolored_count} pixels in AMARAVATI to pure Navy Blue ({NAVY_R}, {NAVY_G}, {NAVY_B})")
    print(f"Cleaned {cleaned_noise_count} noise pixels in gap")

    # Save to all target locations
    targets = [
        r"frontend\src\assets\logo.png",
        r"frontend\src\assets\logo-transparent.png",
        r"frontend\public\logo.png",
        r"frontend\public\logo-transparent.png",
        r"frontend\dist\logo.png",
        r"frontend\dist\logo-transparent.png",
        r"frontend\.output\public\logo.png",
        r"frontend\.output\public\logo-transparent.png",
        r"scratch\logo_navy_final.png",
    ]

    for t in targets:
        os.makedirs(os.path.dirname(t), exist_ok=True)
        img.save(t, "PNG")
        print(f"Saved updated logo to {t}")

    # Also generate a verification preview on pure white background
    white_bg = Image.new("RGB", (w, h), (255, 255, 255))
    white_bg.paste(img, (0, 0), img)
    white_bg.save(r"scratch\comp_navy_final_white.png", "PNG")
    print("Saved preview to scratch\comp_navy_final_white.png")

    # Also copy to artifact directory for embedding/inspection
    artifact_path = r"C:\Users\DELL\.gemini\antigravity\brain\7cecb2a3-82de-4c76-974c-3d57eb893078\logo_navy_final.png"
    img.save(artifact_path, "PNG")
    print(f"Saved artifact to {artifact_path}")

if __name__ == "__main__":
    recolor_amaravati_navy()

