# DiamondGamer: Interactive Portfolio

Personal portfolio for **DiamondGamer**, a community manager, creator and builder. It shows off interactive project demos, Discord bots, web tools, Minecraft and creator communities, collaborators and video editing work, all as a fast static site with no build step.

Live site: **[diamondgamer.xyz](https://diamondgamer.xyz/)**

---

## Features

### Interactive project demos
The demos open in place, inside a small desktop-style window manager (`demos/`):
- **Windows and dock:** windows grow out of the card that opened them, drag by the title bar (pointer or arrow keys), minimize to a dock, maximize and restore, and close with Escape.
- **Soufflé (`demos/souffle.js`):** a web version of the [Soufflé](https://souffle.ink/en/ca/) iPhone app, which is coming soon. Tap scan to watch a sample camera scan identify a landmark, then read its story in a detail sheet, save it or scan the next one.
- **FernSMP Services (`demos/fern.js`):** a Discord-style client with two channels:
  - `#questions`: the support bot answering 20 real, approved knowledge-base questions, with a typing indicator and quick-ask prompts.
  - `#support`: open a sample ticket by picking a category and filling in the modal form.
- **GuildReceipt (`demos/receipt.js`):** a live commission receipt. Pick a preset or edit the item, quantity or price and the slip prints and updates as you type.

### Project showcase
- **Featured project:** Soufflé gets a full-width spotlight with app mockups and a link to the waitlist at souffle.ink.
- **Filters:** All work, Apps, Discord bots, and Web & games, with a sliding pill indicator.
- **Shareable filters:** the active filter is kept in the `?work=` query parameter (`?work=app`, `?work=bot`, `?work=web`).

### Communities and collaborators
- **Communities:** roles and details for FernSMP, Kuda’s Kingdom, Adam’s Army and Adam / Amir’s Appeals, plus earlier projects (BlockRealms Network, PowerCraft SMP, DimeHosting Framework).
- **One-click copy:** copy the FernSMP server IP (`play.fernsmp.net`) or Discord username (`therealdiamondgamer`), with a toast and an accessible `<dialog>` fallback when clipboard access is blocked.
- **Collaborators:** creators and partners from YouTube and community projects.

### Videos
- Featured gaming videos, videos edited for other creators, and promotional Shorts made for FernSMP and BlueMC.

### Design, motion and accessibility
- **Type:** Unbounded for headings, Figtree for body text and JetBrains Mono for labels, loaded from Google Fonts with system fallbacks.
- **Motion:** GSAP intro timeline, viewport reveals with `IntersectionObserver`, animated disclosures, and demo animations that stick to transforms and opacity.
- **Accessibility:** keyboard navigation, skip link, `aria-live` announcements, and support for `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast: more`.
- **Fast:** local WebP assets, lazy-loaded media and a pre-bundled demo script, so the site works from a web server or straight from `index.html`.

---

## Project structure

```text
├── index.html               # Main portfolio page
├── style.css                # Site layout, components and responsive rules
├── script.js                # Filters, clipboard and toasts, GSAP motion, disclosures, counters
├── demos/
│   ├── demos.css            # Window manager and demo styles
│   ├── demos.bundle.js      # Bundled demo scripts (works on file:// and http://)
│   ├── main.js              # Window manager (open, drag, minimize, maximize)
│   ├── souffle.js           # Soufflé scan and landmark demo
│   ├── landmarks.js         # Landmark data for the Soufflé demo
│   ├── fern.js              # FernSMP support bot and ticket demo
│   ├── fern-knowledge.js    # Approved knowledge-base Q&A
│   ├── receipt.js           # GuildReceipt live receipt demo
│   ├── icons.js             # Inline SVG icons
│   └── shared.js            # Shared helpers (escaping, money, reduced motion)
└── assets/
    ├── branding/            # Logos, favicons and social preview image
    ├── experience/          # Community and server logos
    ├── people/              # Collaborator avatars
    ├── projects/            # Project covers and screenshots
    ├── shorts/              # Vertical thumbnails for FernSMP Shorts
    ├── souffle/             # Soufflé mascot and app mockups
    ├── thumbnails/          # YouTube video thumbnails
    └── vendor/              # Local GSAP library and licenses
```

---

## Running locally

No build step is needed to view the site:
1. Double-click `index.html` to open it in a modern browser, **or**
2. Serve the folder with any static server (for example `npx serve .` or VS Code Live Server).

### Rebuilding the demo bundle
After editing anything in `demos/*.js`, rebuild `demos/demos.bundle.js` so the `file://` preview stays in sync:

```bash
npx esbuild demos/main.js --bundle --format=iife --target=es2020 --charset=utf8 --outfile=demos/demos.bundle.js
```
