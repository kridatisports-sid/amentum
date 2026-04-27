# Amentum Sports — Website

**Engineering the Future of Indian Athletics.**

Apple-inspired minimalist redesign of [amentums.com](https://www.amentums.com) — the largest javelin store in Asia.

---

## 🚀 Live Preview

Upload to GitHub Pages for instant deployment (see below).

---

## 📁 Project Structure

```
amentum-sports/
├── index.html          ← Single-page app (all 4 pages)
├── css/
│   └── style.css       ← All styles, tokens, responsive rules
├── js/
│   └── main.js         ← Navigation, scroll reveal, form logic
└── README.md
```

---

## 🎨 Design System

| Token       | Value       | Usage                          |
|-------------|-------------|--------------------------------|
| `--w`       | `#ffffff`   | Primary background             |
| `--off`     | `#f5f4f2`   | Surface / card background      |
| `--ink`     | `#0a0a0a`   | Primary text, nav, buttons     |
| `--mid`     | `#6b6b6b`   | Body text, subheadings         |
| `--red`     | `#c8171a`   | Brand accent (Amentum red)     |
| `--border`  | `rgba(0,0,0,0.08)` | Subtle dividers         |

**Typography:**
- Display: `DM Serif Display` (headings, hero, prices)
- Body: `DM Sans` (nav, body text, labels, buttons)

---

## 📄 Pages

| Page | ID | Description |
|---|---|---|
| Home | `page-home` | Hero · Stats · Products · Mission · Pillars · Insights |
| Shop | `page-shop` | All 9 javelins with real prices · Institutional block |
| Athlete Arena | `page-arena` | Leaderboard · Enroll form with live preview · Profiles |
| Insights | `page-insights` | Featured article · 6-post editorial grid |

---

## 🛠 Tech Stack

- **Pure HTML5 / CSS3 / Vanilla JS** — zero dependencies
- **Google Fonts** (DM Sans + DM Serif Display) via CDN
- **Intersection Observer API** for scroll reveal animations
- **CSS custom properties** for the full design token system
- Fully **mobile-responsive** (breakpoints at 900px, 480px)

---

## 🌐 Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your site will be live at `https://<username>.github.io/<repo>/`

### Or deploy with one command (GitHub CLI):
```bash
gh repo create amentum-sports --public --push --source=.
```
Then enable GitHub Pages in repo settings.

---

## 📦 Products (Real Data from amentums.com/shop)

| Product | Category | Price |
|---|---|---|
| The Nalwa | Competition · 800g | ₹26,000 |
| The Chhatrapati | Competition · 800g | ₹18,200 |
| Olympic Gold | Competition · 600g | ₹14,300 |
| Black Panther | Training · 600g | ₹8,500 |
| Purple White | Training · 600g | ₹7,800 |
| Amentum Red | Youth · 600g | ₹5,460 |
| Gold Kids | Youth · 500g | ₹4,900 |
| Vayuj 400g | Mini · Record Setter | ₹1,298 |
| Vayuj 300g | Mini · Record Setter | ₹1,180 |

---

## ✨ Key Features

- **Custom dot cursor** with hover expansion effect
- **Scroll-triggered reveal animations** (fade up, fade scale) via Intersection Observer
- **iOS-spring easing** `cubic-bezier(0.16, 1, 0.3, 1)` on all transitions
- **Live profile preview** — form inputs update athlete card in real time
- **Frosted glass navbar** with `backdrop-filter: saturate(180%) blur(20px)`
- **Animated hero scroll indicator** with drip-down line animation
- **Seamless marquee** ticker at correct 50% duplicate length

---

## 📞 Contact

- **Phone:** +91 9827654830
- **Instagram:** [@amentum.sports](https://www.instagram.com/amentum.sports/)
- **WhatsApp:** [Chat](https://wa.me/+19084622069)
- **Website:** [amentums.com](https://www.amentums.com)

---

*Amentum Sports: Structured. Affordable. Elite.*
