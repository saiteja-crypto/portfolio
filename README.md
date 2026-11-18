<div align="center">

# Sai Teja

### Computer Science Engineering Student · Software · AI · Data

An interactive portfolio for my projects, technical interests, and experience.

[**Visit the live portfolio ↗**](https://portfolio-nine-psi-h9edio2juk.vercel.app)

[GitHub](https://github.com/Tejaak) · [LinkedIn](https://www.linkedin.com/in/agirishati-sai-teja-38a89334b) · [Email](mailto:sai.teja@mahindrauniversity.edu.in)

</div>

---

## About

I’m a Computer Science Engineering student at Mahindra University in Hyderabad. I’m interested in software development, AI, and data, and enjoy learning by building practical projects.

This site is a responsive, multi-page portfolio built with semantic HTML, custom CSS, Bootstrap, and vanilla JavaScript. It is designed to work on desktop, tablet, and mobile.

## Explore

| Page | What you’ll find |
| --- | --- |
| **Home** | Introduction, education, interests, and selected projects |
| **Work** | Project case studies, category filters, technical skills, experience, and achievements |
| **Contact** | Contact form and links to email, LinkedIn, and GitHub |

## Highlights

- Responsive layouts using CSS Grid, Flexbox, and media queries
- Project filtering and interactive project-detail dialogs
- Achievement and credential detail dialogs
- Keyboard-accessible navigation, visible focus states, and reduced-motion support
- Scroll reveals, counters, page transitions, and pointer interactions
- Neobrutalist visual system with bold typography, color, and offset shadows

## Technology

- **Structure:** HTML5
- **Styling:** CSS3, CSS Grid, Flexbox, responsive media queries
- **Components and icons:** Bootstrap 5, Bootstrap Icons
- **Interactions:** Vanilla JavaScript
- **Hosting:** Vercel

## Run locally

No build step or package installation is required. The site loads Bootstrap, Bootstrap Icons, and Google Fonts from their CDNs, so an internet connection is needed for those assets.

```powershell
git clone https://github.com/saiteja-crypto/portfolio.git
cd portfolio
python -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173) in your browser. You can also open `index.html` directly, though using a local server is recommended.

## Project structure

```text
.
├── index.html              # Home page
├── work.html               # Projects, skills, experience, and achievements
├── contact.html            # Contact form and social links
├── assets/
│   ├── icons/
│   ├── images/
│   └── projects/
├── css/
│   ├── style.css           # Design system and page layouts
│   ├── responsive.css      # Responsive breakpoints
│   └── animations.css      # Motion and reveal effects
└── js/
    ├── main.js             # Shared navigation and interactions
    ├── projects.js         # Project filters and detail dialogs
    └── contact.js          # Contact form validation and email links
```

## Contact form

The portfolio is a static site and does not have a mail server. After validating the form, it provides a prefilled Gmail compose link and a default mail-app fallback. Review and send the draft from your email account; the form does not send messages automatically.

## License

This repository is a personal portfolio. Please contact me before reusing personal images or portfolio content.
