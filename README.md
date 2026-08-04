# ANF Tanning Company — Luxury Single-Page Website

Premium, editorial-style single-page website for **ANF Tanning Company**, a luxury tanning brand. Zero frameworks, zero build tools — runs standalone by opening `index.html` in any browser.

---

## 🚀 Quick Start

```bash
# Just open the file
open index.html              # macOS
start index.html             # Windows (PowerShell)
xdg-open index.html          # Linux

# Or serve locally with any static server
python -m http.server 8080   # then visit http://localhost:8080
# or
npx serve .
```

No `npm install`. No build step. No dependencies.

---

## 📁 Project Structure

```
anf-tanning-website/
├── index.html                         Single-page site (all 11 sections)
├── README.md                          ← You are here
└── assets/
    ├── css/
    │   ├── style.css                  Layout, typography, sections, animations
    │   └── responsive.css             Breakpoints (768px tablet, 1024px desktop)
    ├── js/
    │   ├── main.js                    Sticky nav, smooth scroll, reveal-on-scroll,
    │   │                              hamburger menu, back-to-top, active nav link
    │   ├── gallery.js                 Vanilla JS lightbox (ESC / click-overlay close)
    │   └── form.js                    Contact form validation + Formspree/EmailJS hook
    ├── images/
    │   ├── logo/                      Drop real SVG/PNG logo here
    │   ├── hero/                      Hero background image
    │   ├── founder/                   Founder portrait
    │   ├── products/                  Product photography (6 cards)
    │   └── gallery/                   Gallery shots (8+ images)
    └── icons/                         Optional inline SVGs (uses Font Awesome CDN by default)
```

---

## 🎨 Theming (Edit in one place)

All colors, fonts, spacing, and design tokens live in **`assets/css/style.css`** at the top under the `:root { … }` block.

```css
:root {
  /* Brand colors */
  --color-brown-dark:  #4A2C1A;
  --color-brown:       #6F4E37;
  --color-gold:        #C9A24B;
  --color-gold-light:  #D4AF37;
  --color-offwhite:    #FAF8F5;
  --color-white:       #FFFFFF;
  --color-black:       #111111;

  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body:    'Poppins', sans-serif;
}
```

Change any value → the whole site re-themes instantly.

---

## 🔌 Swapping in Real Content

### 1. Brand Name
Search-and-replace:
- `"ANF Tanning Company"`  → your brand
- `"ANF"`                  → your logo mark

### 2. Phone / WhatsApp / Socials
All placeholders are **marked with comments at the top of `index.html`**. Quick search:

| What | Find in `index.html` | Replace with |
|---|---|---|
| Phone (call button, contact, nav) | `tel:+15551234567` | `tel:+1yournumber` |
| WhatsApp number | `wa.me/15551234567` | `wa.me/1555YOURNUM` (no + or spaces) |
| WhatsApp message | `Hi%20ANF%21%20…` | URL-encoded prefill |
| Instagram | `instagram.com/yourhandle` | real URL |
| Facebook  | `facebook.com/yourhandle` | real URL |
| TikTok    | `tiktok.com/@yourhandle` | real URL |
| YouTube   | `youtube.com/@yourhandle` | real URL |
| Pinterest | `pinterest.com/yourhandle` | real URL |
| Email     | `hello@anftanning.com` | real email |
| Address   | `123 Luxury Avenue, Beverly Hills, CA 90210` | real address |
| Hours     | `Monday – Saturday · 10am – 7pm` | real hours |

### 3. Images
Every image uses [placehold.co](https://placehold.co) URLs. Replace the `src` attribute on any `<img>` tag with your real asset's path:

```html
<!-- BEFORE -->
<img src="https://placehold.co/700x850/4A2C1A/FFFFFF?text=Founder" … />

<!-- AFTER -->
<img src="assets/images/founder/alexandra.jpg" … />
```

### 4. Google Maps
Find the `<iframe id="map">` inside the `#contact` section. Replace the entire `src="…"` with Google Maps > Share > Embed Map code.

### 5. Contact Form Submission
By default the form **validates and shows a success message client-side** (no backend needed). To wire it to a real email handler:

**Option A — Formspree (easiest):**
1. Sign up at formspree.io → create a form → copy your endpoint
2. Open **`assets/js/form.js`**
3. Set: `const FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxx';`

**Option B — EmailJS:** See commented template at the bottom of `form.js`.

---

## ✨ Feature Checklist

- ✅ Sticky navbar with scroll-state styling
- ✅ Mobile hamburger + slide-in drawer (backdrop, ESC-close)
- ✅ Smooth anchor scroll with sticky nav offset
- ✅ Active nav link highlighting (IntersectionObserver)
- ✅ Scroll-reveal fade/slide animations with staggered delays
- ✅ Gallery lightbox (click / keyboard / ESC-close / overlay-close)
- ✅ Contact form: required fields, email regex, phone format, min-length message
- ✅ Success message + inline validation errors
- ✅ Floating WhatsApp + Call buttons (WhatsApp has pulse animation)
- ✅ Back-to-top button (fade in after 500px scroll)
- ✅ Fully responsive (mobile-first, 768/1024 breakpoints)
- ✅ Reduced-motion support (`prefers-reduced-motion`)
- ✅ Semantic HTML, alt text on all images, ARIA labels
- ✅ Lazy-loaded images (`loading="lazy"`, `decoding="async"`)
- ✅ Font Awesome 6 social icons
- ✅ Google Fonts: Playfair Display + Poppins
- ✅ Auto-updating footer copyright year

---

## 🧪 Local Testing Checklist

Open `index.html` and verify:

1. **Nav** — Scroll down; bar turns white with shadow. Click links → smooth jump. Mobile: resize < 768px, click hamburger → drawer slides in, click X / backdrop / link → closes.
2. **Hero** — Full viewport, two buttons, scroll indicator animates.
3. **Reveals** — All sections fade/slide up as you scroll.
4. **Products** — 6 cards, hover lifts card + gold border.
5. **Gallery** — Click any image → lightbox opens. Press ESC or click dark area → closes.
6. **Process** — 5-step timeline.
7. **Contact** — Submit empty form → errors appear below name/email/message. Fill valid data → success banner slides in.
8. **Floating buttons** — WhatsApp green pulse + brown call button visible always at bottom-right.
9. **Back-to-top** — Scroll 500px down; arrow appears at bottom-left.
10. **Footer** — Newsletter field: type email + submit → "Thanks — you're in." appears.

---

## 📜 License

All placeholder images via [placehold.co](https://placehold.co) (free to use for development). Fonts and Font Awesome icons are loaded from their respective CDNs per those services' license terms.

© ANF Tanning Company.
