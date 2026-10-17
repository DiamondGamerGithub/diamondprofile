# DiamondGamer — Interactive Portfolio

Personal portfolio website for **DiamondGamer** — community manager, creator, and builder. It showcases interactive project demos, Discord bots, web tools, Minecraft & creator communities, collaborations, and video editing work in a fast, zero-dependency static experience.

Live site: **[diamondgamer.xyz](https://diamondgamer.xyz/)**

---

## ✨ Active Features

### 🖥️ Interactive Windowed Project Demos
Built-in application demos open directly on the page inside a custom desktop window manager (`demos/`) without leaving the site:
- **Window Controls & Dock:** Draggable titlebars (pointer + keyboard arrow keys), minimize-to-dock bar (`#demo-dock`), maximize/restore toggle, and Escape-to-close modal dialogs.
- **Soufflé (`demos/souffle.js`):** Interactive glass-style mobile homepage preview where visitors can trigger simulated landmark scans and explore place stories.
- **FernSMP Services (`demos/fern.js`):** Simulated Discord client featuring two channels:
  - `#questions` — Interactive AI knowledge base with 20 real approved server Q&As, instant search matching, and quick-ask prompts.
  - `#support` — Interactive Discord support ticket creator with category selection, modal form input, and live ticket preview.
- **GuildReceipt (`demos/receipt.js`):** Live commission receipt generator where editing the item name, quantity, or price updates the formatted receipt slip in real time.

### 🗂️ Filterable Project Showcase
- **Category Filtering:** Filter work across **All work**, **Apps**, **Discord bots**, and **Web & games** with animated underline indicators and dynamic focus descriptions.
- **URL State Sync:** Active filter state syncs with `?work=` URL query parameters (`?work=app`, `?work=bot`, `?work=web`) and browser history (`popstate`).
- **Featured Web & Bot Projects:** Direct launches and expandable feature breakdowns for *Tung Tung Sahoor: Maze Hunt*, *Eterrnal Adam*, *Diamond Discord Bot*, *Soufflé Services Bot*, and *FernSMP Staff Bot*.

### 🌐 Communities & Collaborators
- **Active Communities:** Role breakdowns and expandable details for **FernSMP**, **Kuda’s Kingdom**, **Adam’s Army**, and **Adam / Amir’s Appeals**, plus an expandable archive of earlier server and hosting projects (*BlockRealms Network*, *PowerCraft SMP*, *DimeHosting Framework*).
- **One-Click Copy Actions:** Copy the FernSMP server IP (`play.fernsmp.net`) or Discord username (`therealdiamondgamer`) with toast notifications and an accessible `<dialog>` fallback when clipboard permissions are unavailable.
- **Collaborator Showcase:** Highlights creators and partners worked with across YouTube and community projects.

###🎬 Video & Editing Portfolio
- **Channel Videos:** Featured gaming videos with expandable galleries.
- **Video Editing Work:** Showcase of long-form videos edited for other creators.
- **Short-Form Promotion:** Vertical grid of promotional YouTube Shorts created for FernSMP / BlueMC.

### ⚡ Performance, Motion & Accessibility
- **GSAP Motion System:** Smooth intro timeline, viewport scroll reveals (`IntersectionObserver`), animated filter indicator, and interruptible `<details>` accordion animations.
- **Accessibility & User Preferences:** Full keyboard navigation, skip-to-content link, `aria-live` status announcements, and automatic support for `prefers-reduced-motion`, `prefers-reduced-transparency`, and `prefers-contrast: more`.
- **Self-Contained & Fast:** Local WebP assets, lazy-loaded media, and a pre-bundled demo script (`demos/demos.bundle.js`) so the site and all interactive demos work both on a web server and when opened directly from `index.html`.

---

## 📁 Project Structure

```text
├── index.html               # Main portfolio page
├── style.css                # Core layout, responsive styles, and accessibility rules
├── script.js                # Filters, clipboard/toast handling, GSAP animations, and accordions
├── demos/
│   ├── demos.css            # Window manager and interactive demo styles
│   ├── demos.bundle.js      # Bundled demo scripts (works via file:// and http://)
│   ├── main.js              # Desktop window manager (open, drag, minimize, maximize)
│   ├── souffle.js           # Soufflé landmark app demo
│   ├── landmarks.js         # Landmark data for Soufflé demo
│   ├── fern.js              # FernSMP Discord bot & ticket demo
│   ├── fern-knowledge.js    # Approved knowledge-base Q&A dataset
│   ├── receipt.js           # GuildReceipt live calculator demo
│   ├── icons.js             # Inline SVG icon helper
│   └── shared.js            # Shared animation and reduced-motion helpers
└── assets/
    ├── branding/            # Logos, favicons, and social preview image
    ├── experience/          # Community and server logos
    ├── people/              # Collaborator avatars
    ├── projects/            # Project cover art and screenshots
    ├── shorts/              # Vertical thumbnails for FernSMP Shorts
    ├── souffle/             # Soufflé mascot and app mockups
    ├── thumbnails/          # YouTube video thumbnails
    └── vendor/              # Local GSAP library and licenses
```

---

## 🚀 Running Locally

No build step is required to view the site:
1. Double-click `index.html` to open it directly in any modern browser, **or**
2. Serve the folder with any static server (e.g. `npx serve .` or VS Code Live Server).

### Rebuilding the Demo Bundle (Optional)
If you edit the modular source files inside `demos/*.js`, rebuild `demos/demos.bundle.js` so local `file://` preview stays in sync:

```bash
npx esbuild demos/main.js --bundle --format=iife --target=es2020 --charset=utf8 --outfile=demos/demos.bundle.js
```
