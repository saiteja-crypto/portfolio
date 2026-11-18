# Sai Teja — Personal Portfolio

A 3-page personal portfolio (Home, Work, Contact) built with HTML5, CSS3, Bootstrap 5 and vanilla JavaScript.

## Run it
Open `index.html` in a browser (double-click, or use VS Code "Live Server"). Needs internet once for Bootstrap, Bootstrap Icons and Google Fonts (CDN).

## Before you submit
1. Replace `assets/images/photo.png` with your preferred portrait. The image is displayed in full colour.
2. Verify personal and achievement details, including email, LinkedIn, GitHub, hackathons, and internship information.
3. Add a certificate file or public verification URL for credentials in `work.html` when available. Achievement and certificate cards open a detail dialog; the LinkedIn link is provided as a profile source, but certificates have not been independently verified.
4. Metrics show 4 projects, 10+ technologies, 1 internship, and 2 hackathons. Update the `data-count` values in `index.html` / `work.html` if needed.

Pages are generated static HTML; just edit the `.html` files directly.

## Structure
```
index.html  work.html  contact.html
css/   style.css (design system + layout)  responsive.css (media queries)  animations.css (keyframes, reveal, splash)
js/    main.js (splash, menu, cursor, reveal, counters, transitions)
       projects.js (filtering + Bootstrap modal)  contact.js (form validation)
assets/ images/ icons/ projects/
```

## Viva cheat-sheet
- **HTML5**: `header nav main section article aside footer`, `form label input textarea button`, alt text, `aria-*`.
- **CSS Grid**: hero, about, project grid, skills, metrics, contact layout. **Flexbox**: nav, tags, buttons, footer, timeline items.
- **Media queries**: `responsive.css` at 1200 / 992 / 768 / 576 px; mobile gets a full-screen menu and single-column layouts.
- **Transitions / animations**: hover states in `style.css`; `@keyframes` (blink, slideUp, pulse, float) in `animations.css`; `prefers-reduced-motion` respected.
- **Bootstrap 5**: CDN CSS/JS, `modal` (case studies), `form-control`, utility classes (`d-flex`, `w-100`, `mt-3`, `flex-column`). Custom CSS loads after it and owns the look.
- **JavaScript**: DOM manipulation, event listeners, `IntersectionObserver` (scroll reveal + counters), class toggling (filters, menu, timeline), `requestAnimationFrame` (cursor, counters), form validation with regex, `sessionStorage` (splash shows once per visit).

## Notes
- The contact form has **no backend**. It validates and offers a prefilled Gmail compose link and a `mailto:` fallback; the visitor reviews and sends the draft from their email account.
- Custom cursor and magnetic buttons are disabled on touch devices and with reduced motion.
- Project thumbnails are original schematic SVGs, not screenshots. Replace them with real screenshots in `assets/projects/` if you like.
