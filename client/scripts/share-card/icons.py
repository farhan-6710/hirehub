"""Builds the favicon set from the HireHub logo mark (the briefcase-H on the left of each wordmark).

Outputs:
  public/brand/favicon-light.png  slate mark (logo-gray.png), for light browser UI
  public/brand/favicon-dark.png   light-grey mark (logo-white.png), for dark browser UI
  public/favicon.ico              16/32/48, brand-red mark (reads on light and dark tabs)
  public/brand/apple-icon.png     180x180, white mark on brand red (iOS home screen)
Run through scripts/share-card/render.sh or: python3 scripts/share-card/icons.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / "public"
BRAND = PUBLIC / "brand"
FAVICON_SIZE = 192
APPLE_SIZE = 180
APPLE_PADDING = 0.2
BRAND_RED = (229, 53, 68, 255)
WHITE = (255, 255, 255, 255)


def mark(source: str) -> Image.Image:
    """Loads a mark-only logo and trims transparent edges."""
    image = Image.open(PUBLIC / source).convert("RGBA")
    return image.crop(image.getchannel("A").getbbox())


def recolour(source: Image.Image, colour) -> Image.Image:
    """Fills the mark's shape (alpha) with a single colour."""
    solid = Image.new("RGBA", source.size, colour)
    solid.putalpha(source.getchannel("A"))
    return solid


def square(source: Image.Image, size: int, padding: float, background=(0, 0, 0, 0)) -> Image.Image:
    """Centres the mark on a square canvas with even padding."""
    canvas = Image.new("RGBA", (size, size), background)
    inner = int(size * (1 - 2 * padding))
    scale = inner / max(source.size)
    resized = source.resize((round(source.width * scale), round(source.height * scale)), Image.LANCZOS)
    canvas.alpha_composite(resized, ((size - resized.width) // 2, (size - resized.height) // 2))
    return canvas


slate = mark("logo-gray.png")
light = mark("logo-white.png")
BRAND.mkdir(parents=True, exist_ok=True)

square(slate, FAVICON_SIZE, 0.04).save(BRAND / "favicon-light.png", optimize=True)
square(light, FAVICON_SIZE, 0.04).save(BRAND / "favicon-dark.png", optimize=True)
square(recolour(slate, BRAND_RED), 48, 0.02).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
square(recolour(slate, WHITE), APPLE_SIZE, APPLE_PADDING, BRAND_RED).save(BRAND / "apple-icon.png", optimize=True)

print("Wrote favicon-light.png, favicon-dark.png, public/favicon.ico, apple-icon.png")
