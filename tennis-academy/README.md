# Ace Tennis Academy Website

A fully responsive, multi-page web application for Ace Tennis Academy — built as the ICS2102 Web Application Development project at Strathmore University.

## Project Overview

**Theme:** Tennis Academy — Nairobi, Kenya  
**Student:** Mnadhiri Simeon Peter (219809)  
**Course:** ICS2102 Web Application Development  
**Institution:** Strathmore University (SIMS)

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, stats, programme preview, tournament CTA |
| About | `about.html` | Academy story, values, coaching team |
| Coaching | `coaching.html` | 6 training programmes with live search filter |
| Schedule | `schedule.html` | Weekly timetable and upcoming events |
| Tournament | `tournament.html` | Ace Open 2026 — group draw and format |
| Gallery | `gallery.html` | Filterable photo gallery by category |
| Contact | `contact.html` | Validated contact form, FAQ, office info |

## Technologies Used

- HTML5 (semantic tags)
- CSS3 (custom properties, flexbox, grid, media queries)
- JavaScript ES6+ (modules, DOM manipulation, localStorage)
- Bootstrap 5.3 (responsive grid, navbar, accordion)
- Google Fonts (Bebas Neue + Inter)

## JavaScript Features

1. **Contact Form Validation** — real-time field validation with error messages and success feedback
2. **Gallery Category Filter** — filter gallery items by Training / Tournament / Fitness / Team
3. **Live Programme Search** — search coaching programmes by keyword on the coaching page
4. **Dark Mode Toggle** — persists via localStorage across page loads
5. **Scroll Reveal** — IntersectionObserver-based reveal animations

## Project Structure

```
tennis-academy/
├── index.html
├── about.html
├── coaching.html
├── schedule.html
├── tournament.html
├── gallery.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── images/
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--green-dark` | `#1B4332` | Primary backgrounds |
| `--green-mid` | `#2D6A4F` | Buttons, accents |
| `--gold` | `#E9C46A` | Brand accent (ball yellow) |
| `--dark` | `#0D1B2A` | Dark backgrounds, text |
| `--white` | `#F8F9FA` | Page backgrounds |

Fonts: **Bebas Neue** (headings) + **Inter** (body)

## Git Commit Schedule

- **15 June** — Initial commit (Milestone 0)
- **19 June** — 3 pages + Bootstrap navbar (Milestone 1, 8+ commits)
- **23 June** — 5 pages + JS features (Milestone 2, 18+ commits)
- **27 June** — All 7 pages, realistic content (Milestone 3, 28+ commits)
- **28 June** — Final submission (34+ commits)

## Responsive Design

Tested on:
- Desktop (1440px+)
- Tablet (768px–1024px)
- Mobile (320px–767px)

Uses Bootstrap 5 breakpoints and custom media queries.

---

&copy; 2026 Ace Tennis Academy · Mnadhiri Simeon Peter
