from PIL import Image

src = r"src/assets/Logo-A.png"
dst_light_bg = r"src/assets/logo-dark.png"
dst_dark_bg = r"src/assets/logo-light.png"

WHITE_THRESHOLD = 230
DARK_THRESHOLD = 110

def is_near_white(r, g, b):
    return r >= WHITE_THRESHOLD and g >= WHITE_THRESHOLD and b >= WHITE_THRESHOLD

def is_dark_neutral(r, g, b):
    if max(r, g, b) > DARK_THRESHOLD:
        return False
    mx, mn = max(r, g, b), min(r, g, b)
    return (mx - mn) <= 25

def make_variant(src_path, dst_path, darken_text_to_white):
    img = Image.open(src_path).convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if is_near_white(r, g, b):
                pixels[x, y] = (0, 0, 0, 0)
            elif darken_text_to_white and is_dark_neutral(r, g, b):
                pixels[x, y] = (255, 255, 255, a)
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    img.save(dst_path)
    print(f"Saved {dst_path} size={img.size}")

make_variant(src, dst_light_bg, darken_text_to_white=False)
make_variant(src, dst_dark_bg, darken_text_to_white=True)
