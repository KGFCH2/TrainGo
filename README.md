# 🚆 TrainGo

> 🌟 A modern, cinematic railway booking platform strictly focused on West Bengal — built with React, Three.js, and Framer Motion. 🚄

---

## 📖 Overview

**TrainGo** is a professional-grade train booking web application directly engineered for West Bengal's railway network. 🚂 It features a Three.js-powered 3D cinematic hero experience, parallax scrolling, smooth page transitions, real-time seat selection, PDF ticket generation, and a fully responsive design system. 📱💻

The platform simulates 1,050+ trains spanning 200+ stations across all 23 districts of West Bengal, complete with multiple coach classes, dynamic fare calculation, and route visualisation. 🗺️

---

## ✨ Features

- **3D Cinematic Hero 🌌** — Three.js scene with animated torus knot, floating geometric shapes, orbital network lines, and star field.
- **Parallax Scrolling 📜** — Smooth scroll-driven animations on the landing page using Framer Motion's `useScroll` and `useTransform`.
- **Cinematic Page Transitions 🎬** — Blur, scale, and fade transitions between routes via `AnimatePresence`.
- **Train Search & Filter 🔍** — Search by origin/destination, filter by type and status, sort by departure/fare/duration.
- **Interactive Seat Map 💺** — Visual coach selector with 5 classes (GEN, SL, 3A, 2A, 1A), real-time seat availability, and fare calculation.
- **Multi-Step Booking Flow 🛤️** — 5-step guided booking: Search ➡️ Select Train ➡️ Seats ➡️ Passengers ➡️ Confirm.
- **PDF Ticket Generation 🎫** — Professionally formatted e-tickets with QR placeholder, fare summary, and tricolor branding via jsPDF.
- **Dynamic Modal Popups 🪟** — Click on any train card to view a beautifully crafted fixed modal with full route details and schedule perfectly centered to the viewport.
- **Real-World Train Data Integration 🚆** — Seeded with actual West Bengal train names (e.g., Darjeeling Mail, Vande Bharat, local routes) alongside simulated schedules.
- **Authentication 🔐** — Local sign-up/login with profile management (Note: Data stored in browser `localStorage` for demo purposes).
- **Dark Mode 🌙** — Professional dark theme optimized for railway booking.
- **India Tricolor Signature 🇮🇳** — Subtle 3px gradient bar as a respectful national identity marker.
- **Dedicated Info Pages ℹ️** — Privacy Policy, Terms of Service, FAQ (accordion), Help Center, About.
- **Responsive Design 📱** — Mobile-first layout with adaptive grid, collapsible navigation, and touch-friendly controls.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 ⚡ |
| 3D Graphics | Three.js, @react-three/fiber, @react-three/drei 🧊 |
| Animation | Framer Motion 11 🏃 |
| Styling | Tailwind CSS 3.4 🎨 |
| Routing | React Router DOM 6 🗺️ |
| PDF | jsPDF 📄 |
| Icons | react-icons (Feather) ✒️ |

---

## 📂 Project Structure

```text
TrainGo/
├── public/ 📁
├── src/ 💻
│   ├── components/ 🧩
│   ├── pages/ 📄
│   ├── context/ 🌐
│   ├── data/ 📊
│   ├── utils/ 🛠️
│   ├── App.jsx 📱
│   ├── main.jsx 🏁
│   └── index.css 🎨
├── tailwind.config.js ⚙️
├── vite.config.js ⚡
├── package.json 📦
├── README.md 📖
└── INSTRUCTIONS.md 📋
```

---

## 🎨 Design System

### 🌈 Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `primary-500` | `#3b82f6` | Primary actions, links, highlights 🔵 |
| `primary-600` | `#2563eb` | Hover states, active elements 🔵 |
| `accent-500` | `#f97316` | Secondary CTAs, warm accents 🟠 |
| `surface-900` | `#0f172a` | Background panels 🌑 |
| `surface-950` | `#020617` | Base background 🌑 |
| `saffron` | `#FF9933` | Tricolor signature only 🟠 |
| `indian-green` | `#138808` | Tricolor signature only 🟢 |

---

## 📝 Licence

This project is licensed under the **[MIT License](LICENSE)**. 🎓
For details on future feature implementations, API integration processes, and data security scaling details, please refer to the private documentation in `FUTURE_IMPLEMENTATIONS.md` (hidden natively via `.gitignore`).


---

*Built with care for West Bengal's railway heritage. 🚆💖*
