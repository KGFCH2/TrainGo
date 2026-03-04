# 🚀 TrainGo — Setup & Usage Instructions

Complete guide to setting up, running, and using the TrainGo railway booking platform optimized exclusively for West Bengal from scratch. 🚆

---

## ⚙️ Prerequisites

Ensure the following are installed on your system:

| Tool 🛠️ | Version 🔢 | Check 🩺 |
|---|---|---|
| **Node.js** | 18.x or higher | `node --version` |
| **npm** | 9.x or higher | `npm --version` |
| **Git** | Any recent version | `git --version` |
| **Browser** | Chrome, Firefox, or Edge | — |

---

## 🚀 Step 1 — Clone or Download the Project

Navigate to your folder:

```bash
cd path/to/TrainGo
```

Or clone from a repository:

```bash
git clone <repository-url>
cd TrainGo
```

---

## 📦 Step 2 — Install Dependencies

Run the following command in the project root directory:

```bash
npm install
```

> **Note ⚠️:** Three.js packages are pinned to `@react-three/fiber@8.15.12` and `@react-three/drei@9.88.17` for React 18 compatibility. Do not upgrade to v9 without React 19.

---

## 🏃 Step 3 — Start the Development Server

```bash
npm run dev
```

The app will start at: `http://localhost:5173` 🌐

Open this URL in your browser. Changes to source files will update instantly. ✨

---

## 🏗️ Step 4 — Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder. Preview the production build: `npm run preview` 🚀

---

## 📖 Using the Application

### 📍 Navigation
App uses standard page routing for Home 🏠, Trains 🚆, Booking 🎫, My Tickets 🎟️, Profile 👤, and dedicated info pages. ℹ️

### 👤 Creating an Account
1. Click **Sign In** 🔐 or navigate to `/profile`.
2. Click **Sign up** 📝.
3. Fill required fields and hit **Create Account** ✅.

### 🎫 Booking a Train
1. Navigate to **Booking** 🛤️.
2. Search origin/destination 🔍.
3. Browse and select available trains 🚄.
4. Choose class and seats from the map 💺 (up to 6).
5. Enter passenger info 👨‍👩‍👧‍👦.
6. **Confirm & Book** 💳.

### 🖨️ Downloading & Cancelling Tickets
Navigate to **My Tickets** 🎟️ to download the PDF e-ticket 📄 or Cancel ❌ your bookings.

### 💡 Train Search Tips
- Filter by Type 🗂️ and Status ⏱️. Sort by Departure/Fare/Duration 📊.
- Express/Superfast/Intercity trains have **flip cards** 📇 to see the full route on hover.

---

## 📂 Project Files and Their Operations

Here is the operational breakdown of each file inside the directory confirming their purpose:

### Root Files 🌐
- **`index.html` 📄:** Main HTML file hosting the React root div. Includes fonts and manifest configurations.
- **`package.json` 📦:** Declares all local and peer dependencies like React, Tailwind, and Three.js. Holds script shortcuts (`dev`, `build`).
- **`package-lock.json` 🔒:** Locks down explicitly installed packages and their correct nested dependency version trees.
- **`vite.config.js` ⚡:** Vite setup specifically optimized with `@vitejs/plugin-react` integration.
- **`tailwind.config.js` 🎨:** Houses custom typography, colors, animations, design tokens, and the tricolor signature style.
- **`postcss.config.js` ⚙️:** The processing engine configuring Tailwind and autoprefixing for CSS compilation.
- **`README.md` 📖:** Project brief explaining features, tech stack, and structure.
- **`INSTRUCTIONS.md` 📋:** Detailed step-by-step documentation (this file).
- **`.gitignore` 🙈:** Specifies intentionally untracked files like `.extra_features.md` to be hidden from standard Git commits.

### Source Files (`src/`) 💻
- **`main.jsx` 🏁:** Entry point where React strictly renders `App.jsx` into the DOM.
- **`App.jsx` 📱:** Central routing layout where contexts wrap core components such as Navbar and Footer via `react-router-dom`.
- **`index.css` 🎨:** Stores core Tailwind variables, base CSS overrides, and custom classes (.glass, .card, etc.).

### Components (`src/components/`) 🧩
- **`Navbar.jsx` 🧭:** Renders the navigation menu and tricolor design header.
- **`Footer.jsx` 🦶:** Renders the bottom column layout with informational and social links.
- **`Hero.jsx` 🦸‍♂️:** Main landing section combining Three.js 3D backdrops with text intro elements.
- **`HeroBackground.jsx` 🌌:** A specific decorative background component accompanying the Hero section animations via framer-motion.
- **`TrainScene3D.jsx` 🧊:** Core 3D engine employing React Three Fiber to display animated 3D geometries (e.g. torus knots, star fields).
- **`TrainCard.jsx` 💳:** UI component displaying single train information with a flip animation showing extended route tracking.
- **`TrainList.jsx` 📋:** Searchable list wrapping the multiple `TrainCard` components equipped with filtering logic.
- **`BookingSection.jsx` 🎟️:** The main logical parent orchestrating the 5-step booking flow interface.
- **`SeatMap.jsx` 💺:** Interactive graphical layout logic to toggle, select, and lock seats visually.
- **`MyTickets.jsx` 🧾:** User-specific dashboard rendering generated reservations with buttons to display PDF or cancel runs.
- **`Profile.jsx` 👤:** Houses Auth Forms (Login / Signup) and manages users' immediate frontend session states.
- **`Contact.jsx` 📞:** Contains UI for submitting help requests directly via a frontend form.

### Contexts (`src/context/`) Provider Overlays 🌐
- **`AuthContext.jsx` 🔐:** Simplistic logic to simulate user login checking/persisting credentials across session storage.
- **`BookingContext.jsx` 🎫:** Dedicated context keeping track of what trains/seats the user holds to carry data globally into MyTickets.
- **`ThemeContext.jsx` 🌓:** Allows the application UI to switch between standard dark themes.

### Data (`src/data/`) Mocks 📊
- **`stations.js` 🚉:** Massive object array storing structured meta-information around 200+ physical West Bengal stations and route paths.
- **`generateTrains.js` 🚆:** Factory utility running procedurally to generate 1050+ realistic train structures using the data from `stations.js` dynamically.

### Pages (`src/pages/`) Documentations 📄
- **`AboutPage.jsx` ℹ️:** Provides content regarding the TrainGo educational initiative background.
- **`FAQPage.jsx` ❓:** Collapsible accordion-style page summarizing regular questions dynamically.
- **`HelpPage.jsx` 🤝:** Dedicated resource landing giving quick guidelines to troubled passengers.
- **`PrivacyPage.jsx` 🛡️:** Text layout containing faux privacy policies and security disclosures.
- **`TermsPage.jsx` ⚖️:** Details terms of services structured for this simulation platform.

### Utilities (`src/utils/`) 🛠️
- **`helpers.js` 🧪:** Modular standalone tasks manipulating strings, time formats, or dynamic badges parsing colors efficiently.
- **`pdfGenerator.js` 📄:** Heavily configured functionality consuming jsPDF to inject HTML ticket structures mathematically into downloadable PDFs.

### Public Directory (`public/`) 🖼️
- **`WB_TrainGo.png` / `WB_TrainGo_1.png` / `WB_TrainGo_2.png` 📸:** Essential application thumbnail screenshots typically used for documentation references or favicons. They are perfectly okay to keep.

> **Status Check ✅:** Everything is structurally perfectly integrated and intact. There are zero broken links, invalid references, or leftover boilerplate code files that require deletion. Any leftover React App logos have already been managed. You are perfectly good to proceed without wiping any file locally.

---

## 🛠️ Troubleshooting

| Issue 🛑 | Solution 🟢 |
|---|---|
| `npm install` fails | Run `npm install --legacy-peer-deps` |
| 3D scene not rendering | Ensure WebGL is enabled in your browser 🖥️ |
| Blank page on navigation | Clear browser cache and perform hard refresh 🔄 |
| PDF download not working | Check for active pop-up blockers ❌ |
