# WB TrainGo

> A modern, cinematic railway booking platform for West Bengal — built with React, Three.js, and Framer Motion.

---

## Overview

**WB TrainGo** is a professional-grade train booking web application covering West Bengal's railway network. It features a Three.js-powered 3D cinematic hero experience, parallax scrolling, smooth page transitions, real-time seat selection, PDF ticket generation, and a fully responsive design system.

The platform simulates 1,050+ trains spanning 200+ stations across all 23 districts of West Bengal, complete with multiple coach classes, dynamic fare calculation, and route visualisation.

---

## Features

- **3D Cinematic Hero** — Three.js scene with animated torus knot, floating geometric shapes, orbital network lines, and star field
- **Parallax Scrolling** — Smooth scroll-driven animations on the landing page using Framer Motion's `useScroll` and `useTransform`
- **Cinematic Page Transitions** — Blur, scale, and fade transitions between routes via `AnimatePresence`
- **Train Search & Filter** — Search by origin/destination, filter by type and status, sort by departure/fare/duration
- **Interactive Seat Map** — Visual coach selector with 5 classes (GEN, SL, 3A, 2A, 1A), real-time seat availability, and fare calculation
- **Multi-Step Booking Flow** — 5-step guided booking: Search → Select Train → Seats → Passengers → Confirm
- **PDF Ticket Generation** — Professionally formatted e-tickets with QR placeholder, fare summary, and tricolor branding via jsPDF
- **Flip Cards** — Express/Superfast/Intercity trains display route details on hover flip
- **Authentication** — Local sign-up/login with profile management (localStorage-backed)
- **Dark Mode** — Professional dark theme optimized for railway booking
- **India Tricolor Signature** — Subtle 3px gradient bar as a respectful national identity marker
- **Dedicated Info Pages** — Privacy Policy, Terms of Service, FAQ (accordion), Help Center, About
- **Responsive Design** — Mobile-first layout with adaptive grid, collapsible navigation, and touch-friendly controls

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| 3D Graphics | Three.js, @react-three/fiber, @react-three/drei |
| Animation | Framer Motion 11 |
| Styling | Tailwind CSS 3.4 |
| Routing | React Router DOM 6 |
| PDF | jsPDF |
| Icons | react-icons (Feather) |

---

## Project Structure

```
WB_TrainGo/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Professional nav with tricolor signature
│   │   ├── Hero.jsx            # 3D hero with parallax & typewriter
│   │   ├── TrainScene3D.jsx    # Three.js canvas scene
│   │   ├── TrainCard.jsx       # Train card with flip variant
│   │   ├── TrainList.jsx       # Search, filter & sort trains
│   │   ├── BookingSection.jsx  # 5-step booking flow
│   │   ├── SeatMap.jsx         # Interactive seat selector
│   │   ├── MyTickets.jsx       # Ticket list & PDF download
│   │   ├── Profile.jsx         # Auth & profile management
│   │   ├── Contact.jsx         # Contact form & info
│   │   └── Footer.jsx          # 4-column footer with links
│   ├── pages/
│   │   ├── PrivacyPage.jsx
│   │   ├── TermsPage.jsx
│   │   ├── FAQPage.jsx
│   │   ├── HelpPage.jsx
│   │   └── AboutPage.jsx
│   ├── context/
│   │   ├── ThemeContext.jsx     # Dark mode context
│   │   ├── AuthContext.jsx      # User auth state
│   │   └── BookingContext.jsx   # Bookings & booked seats
│   ├── data/
│   │   ├── stations.js         # 200+ stations, 23 districts, 33 routes
│   │   └── generateTrains.js   # 1050+ procedural trains
│   ├── utils/
│   │   ├── helpers.js          # Date, badge, seat utilities
│   │   └── pdfGenerator.js     # jsPDF ticket generator
│   ├── App.jsx                 # React Router + page transitions
│   ├── main.jsx                # Entry point with BrowserRouter
│   └── index.css               # Design system & utilities
├── tailwind.config.js
├── vite.config.js
├── package.json
├── README.md
└── INSTRUCTIONS.md
```

---

## Design System

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `primary-500` | `#3b82f6` | Primary actions, links, highlights |
| `primary-600` | `#2563eb` | Hover states, active elements |
| `accent-500` | `#f97316` | Secondary CTAs, warm accents |
| `surface-900` | `#0f172a` | Background panels |
| `surface-950` | `#020617` | Base background |
| `saffron` | `#FF9933` | Tricolor signature only |
| `indian-green` | `#138808` | Tricolor signature only |

### CSS Utilities

- `.glass` — Frosted glass panel
- `.card` — Surface card with subtle border
- `.btn-primary` / `.btn-secondary` / `.btn-ghost` — Button variants
- `.input-field` — Form input styling
- `.badge-*` — Status badges (success, danger, warning, info)
- `.tricolor-bar` — 3px India tricolor gradient bar

---

## Licence

This project is for educational and demonstration purposes.

---

*Built with care for West Bengal's railway heritage.*
