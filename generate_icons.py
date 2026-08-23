import os
import math
from PIL import Image, ImageDraw, ImageFilter

def create_cozylock_icon(size):
    # Create high-res canvas (4x scale for super crisp anti-aliasing)
    scale = 4
    canvas_size = size * scale
    img = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Padding and geometry
    pad = canvas_size * 0.08
    rect_box = [pad, pad, canvas_size - pad, canvas_size - pad]
    radius = canvas_size * 0.24

    # 1. Background rounded rectangle
    bg_img = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg_img)
    bg_draw.rounded_rectangle(rect_box, radius=radius, fill=(20, 14, 28, 255))
    
    # Inner glow / gradient overlay
    for i in range(int(radius)):
        alpha = int(70 * (1 - i / radius))
        inset = pad + i * 0.5
        bg_draw.rounded_rectangle(
            [inset, inset, canvas_size - inset, canvas_size - inset],
            radius=max(2, radius - i * 0.5),
            outline=(244, 114, 182, alpha),
            width=1
        )

    # 2. Glowing atmospheric backlight
    glow_img = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_img)
    center_x = canvas_size * 0.5
    center_y = canvas_size * 0.52
    glow_r = canvas_size * 0.32
    glow_draw.ellipse(
        [center_x - glow_r, center_y - glow_r, center_x + glow_r, center_y + glow_r],
        fill=(255, 179, 71, 140)
    )
    glow_img = glow_img.filter(ImageFilter.GaussianBlur(canvas_size * 0.12))

    # Composite background & glow
    img.paste(bg_img, (0, 0), bg_img)
    img.paste(glow_img, (0, 0), glow_img)

    # 3. Draw Padlock + Cozy Sparkle Motif
    icon_draw = ImageDraw.Draw(img)
    
    # Padlock Shackle (arch)
    shackle_w = canvas_size * 0.28
    shackle_h = canvas_size * 0.26
    shackle_left = center_x - shackle_w / 2
    shackle_top = center_y - canvas_size * 0.24
    shackle_thickness = max(2 * scale, int(canvas_size * 0.07))

    # Outer arc
    shackle_box = [shackle_left, shackle_top, shackle_left + shackle_w, shackle_top + shackle_h * 2]
    icon_draw.arc(shackle_box, start=180, end=0, fill=(255, 215, 160, 255), width=shackle_thickness)
    # Shackle legs
    leg_len = canvas_size * 0.08
    icon_draw.line(
        [(shackle_left + shackle_thickness / 2, shackle_top + shackle_h),
         (shackle_left + shackle_thickness / 2, shackle_top + shackle_h + leg_len)],
        fill=(255, 215, 160, 255), width=shackle_thickness
    )
    icon_draw.line(
        [(shackle_left + shackle_w - shackle_thickness / 2, shackle_top + shackle_h),
         (shackle_left + shackle_w - shackle_thickness / 2, shackle_top + shackle_h + leg_len)],
        fill=(255, 215, 160, 255), width=shackle_thickness
    )

    # Padlock Body
    body_w = canvas_size * 0.44
    body_h = canvas_size * 0.34
    body_left = center_x - body_w / 2
    body_top = center_y - canvas_size * 0.04
    body_radius = canvas_size * 0.07

    # Body fill with gradient effect
    icon_draw.rounded_rectangle(
        [body_left, body_top, body_left + body_w, body_top + body_h],
        radius=body_radius,
        fill=(244, 114, 182, 255),
        outline=(255, 230, 240, 255),
        width=max(1 * scale, int(canvas_size * 0.025))
    )

    # Keyhole / Sparkle in the padlock center
    kh_center_y = body_top + body_h * 0.42
    kh_radius = canvas_size * 0.045
    # Small top circle
    icon_draw.ellipse(
        [center_x - kh_radius, kh_center_y - kh_radius, center_x + kh_radius, kh_center_y + kh_radius],
        fill=(20, 14, 28, 255)
    )
    # Keyhole bottom trapezoid/line
    icon_draw.polygon(
        [
            (center_x - kh_radius * 0.6, kh_center_y),
            (center_x + kh_radius * 0.6, kh_center_y),
            (center_x + kh_radius * 0.9, kh_center_y + kh_radius * 1.8),
            (center_x - kh_radius * 0.9, kh_center_y + kh_radius * 1.8)
        ],
        fill=(20, 14, 28, 255)
    )

    # Cozy Celestial 4-Point Sparkle on top-right of lock
    sp_x = canvas_size * 0.74
    sp_y = canvas_size * 0.24
    sp_r = canvas_size * 0.11

    # Sparkle glow
    icon_draw.ellipse([sp_x - sp_r, sp_y - sp_r, sp_x + sp_r, sp_y + sp_r], fill=(255, 255, 255, 40))
    # Sparkle points
    sp_poly = [
        (sp_x, sp_y - sp_r),
        (sp_x + sp_r * 0.22, sp_y - sp_r * 0.22),
        (sp_x + sp_r, sp_y),
        (sp_x + sp_r * 0.22, sp_y + sp_r * 0.22),
        (sp_x, sp_y + sp_r),
        (sp_x - sp_r * 0.22, sp_y + sp_r * 0.22),
        (sp_x - sp_r, sp_y),
        (sp_x - sp_r * 0.22, sp_y - sp_r * 0.22),
    ]
    icon_draw.polygon(sp_poly, fill=(255, 255, 255, 255))

    # Downscale smoothly to final target resolution
    final_img = img.resize((size, size), Image.Resampling.LANCZOS)
    return final_img

out_dir = r"e:\Users\Desktop\AI PROJECT\cozyplay\extension\icons"
os.makedirs(out_dir, exist_ok=True)

sizes = [16, 48, 128, 256]
for s in sizes:
    icon = create_cozylock_icon(s)
    path = os.path.join(out_dir, f"icon-{s}.png")
    icon.save(path, "PNG")
    print(f"Generated {path} ({s}x{s})")

icon256 = create_cozylock_icon(256)
icon256.save(os.path.join(out_dir, "cozylock.png"), "PNG")
print("Done creating CozyLock icons!")
