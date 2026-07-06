# DiamondGamer Portfolio

Personal portfolio website for DiamondGamer, built as a static GitHub Pages site and served from [diamondgamer.xyz](https://diamondgamer.xyz/).

## About

This site showcases DiamondGamer's content creation, community management work, server staff experience, and web projects. It includes a profile section, YouTube video carousel, server/network highlights, project links, image previews, and a Discord contact button.

## Live Site

[diamondgamer.xyz](https://diamondgamer.xyz/)

## Current Project Structure

```text
.
|-- index.html                 # Main desktop entry used by GitHub Pages
|-- mobileindex.html           # Legacy redirect to /mobile/
|-- style.css                  # Legacy loader for /css/style.css
|-- script.js                  # Legacy loader for /javascript/script.js
|-- intro.js                   # Legacy loader for /javascript/intro.js
|-- mobilestyle.css            # Legacy loader for /css/mobile.css
|-- mobilescript.js            # Legacy loader for /javascript/mobile.js
|-- mobile-jitter-fix.js       # Legacy loader for /javascript/mobile-jitter-fix.js
|-- CNAME
|-- assets/
|   |-- branding/
|   |-- experience/
|   |-- misc/
|   |-- projects/
|   `-- thumbnails/
|-- css/
|   |-- style.css
|   `-- mobile.css
|-- javascript/
|   |-- script.js
|   |-- intro.js
|   |-- mobile.js
|   `-- mobile-jitter-fix.js
|-- desktop/
`-- mobile/
    `-- index.html             # Real mobile entry
```

## Important Notes

The root compatibility files are intentionally kept so older links, cached browsers, and GitHub Pages paths do not break. The real organized code lives inside `css/`, `javascript/`, `assets/`, `desktop/`, and `mobile/`.

Avoid deleting the root compatibility loaders unless every HTML file has already been updated to use the organized folder paths directly.

## Features

- Static HTML, CSS, and JavaScript
- Custom domain through GitHub Pages
- Responsive desktop and mobile portfolio layouts
- Animated profile card and background effects
- YouTube showcase carousel
- Click-to-preview image lightbox
- Clipboard contact button for Discord username
- Active community links for BlockRealms, Kuda, Adam's Army, and Adam/Amir's ban appeal server
- Minecraft IP copy button for `play.blockrealms.net`
- Highlight cards for staff support, community management, and Minecraft plugin configs
- Cache versioning for easier public updates

## Contact

Email: [diamond@diamondgamer.xyz](mailto:diamond@diamondgamer.xyz)

## Credits

Created and maintained by DiamondGamer.
