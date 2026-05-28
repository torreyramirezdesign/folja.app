<div align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="följa logo" width="80" height="80" />
  
  # följa

  #### [folja.torreyramirez.com](https://folja.torreyramirez.com)

  ### /ˈføl.ja/ • Swedish for *"to follow"* or *"to track"*

  **följa** is a premium, distraction-free job application tracker designed for modern professionals. Moving away from clunky, uninspired spreadsheet layouts, **följa** brings aesthetic grid-systems, fluid micro-interactions, and visual elegance to your career search.

  [![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=FFDF00)](https://vite.dev)
  [![CSS3](https://img.shields.io/badge/CSS3-Custom-1572B6?style=for-the-badge&logo=css3&logoColor=ffffff)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![Mobile Friendly](https://img.shields.io/badge/Mobile-Native_Feel-4ADE80?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
  [![License](https://img.shields.io/badge/License-MIT-F3F4F6?style=for-the-badge)](LICENSE)

  *Track smarter. Visualize beautifully. Stay organized.*

  ---
</div>

## 📸 Screenshots

<p align="center">
  <img src="Screenshots/Screenshot%20From%202026-05-28%2018-19-39.png" width="49%" alt="Screenshot 1" />
  <img src="Screenshots/Screenshot%20From%202026-05-28%2018-19-52.png" width="49%" alt="Screenshot 2" />
  <img src="Screenshots/Screenshot%20From%202026-05-28%2018-21-05.png" width="49%" alt="Screenshot 3" />
  <img src="Screenshots/Screenshot%20From%202026-05-28%2018-21-14.png" width="49%" alt="Screenshot 4" />
  <img src="Screenshots/Screenshot%20From%202026-05-28%2018-21-29.png" width="49%" alt="Screenshot 5" />
  <img src="Screenshots/Screenshot%20From%202026-05-28%2018-21-42.png" width="49%" alt="Screenshot 6" />
  <img src="Screenshots/Screenshot%20From%202026-05-28%2018-21-55.png" width="49%" alt="Screenshot 7" />
  <img src="Screenshots/Screenshot%20From%202026-05-28%2018-22-08.png" width="49%" alt="Screenshot 8" />
  <img src="Screenshots/Screenshot%20From%202026-05-28%2018-22-23.png" width="49%" alt="Screenshot 9" />
  <img src="Screenshots/Screenshot%20From%202026-05-28%2018-22-30.png" width="49%" alt="Screenshot 10" />
  <img src="Screenshots/Screenshot%20From%202026-05-28%2018-22-44.png" width="49%" alt="Screenshot 11" />
</p>

## 📱 Mobile

<p align="center">
  <img src="mobile%20screenshots/IMG_3399.jpg" width="24%" alt="Mobile Screenshot 1" />
  <img src="mobile%20screenshots/IMG_3400.PNG" width="24%" alt="Mobile Screenshot 2" />
  <img src="mobile%20screenshots/IMG_3401.PNG" width="24%" alt="Mobile Screenshot 3" />
  <img src="mobile%20screenshots/IMG_3402.jpg" width="24%" alt="Mobile Screenshot 4" />
  <img src="mobile%20screenshots/IMG_3403.jpg" width="24%" alt="Mobile Screenshot 5" />
  <img src="mobile%20screenshots/IMG_3404.PNG" width="24%" alt="Mobile Screenshot 6" />
  <img src="mobile%20screenshots/IMG_3405.PNG" width="24%" alt="Mobile Screenshot 7" />
  <img src="mobile%20screenshots/IMG_3406.jpg" width="24%" alt="Mobile Screenshot 8" />
  <img src="mobile%20screenshots/IMG_3407.jpg" width="24%" alt="Mobile Screenshot 9" />
  <img src="mobile%20screenshots/IMG_3408.jpg" width="24%" alt="Mobile Screenshot 10" />
  <img src="mobile%20screenshots/IMG_3409.jpg" width="24%" alt="Mobile Screenshot 11" />
  <img src="mobile%20screenshots/IMG_3410.jpg" width="24%" alt="Mobile Screenshot 12" />
</p>

## 🌟 Key Features

### 📐 Dual Layout Engine
Switch seamlessly between two distinct viewports designed to accommodate different workflows:
- **Horizontal Spreadsheet Grid**: A compact, tabular, data-dense view optimized for desktop monitors, presenting all key details in a single elegant row per application.
- **Vertical Card List**: A classic, visual, and highly readable card interface, putting focus on text notes and interactive categories.

### 🌓 Tailored Dark & Light Modes
Built with an advanced design system based on dynamic HSL/RGB custom variables. 
- **Dark Mode**: A deep, glassmorphic palette using rich grays (`#0B0E14` & `#191E28`) with high-contrast pastel accents.
- **Light Mode**: A clean, high-legibility layout that retains smooth shadows and sophisticated glass border-radius variables without losing visual hierarchy.

### ⚡ Lightning Fast Inline Editing
No tedious pop-up modals or multi-step edit pages. Click directly on a job card's **Organization** or **Role Title** to enter focus mode.
- Press <kbd>Enter</kbd> to save.
- Press <kbd>Escape</kbd> to discard.
- Click anywhere else to automatically commit changes via intelligent `onBlur` listeners.

### 🎨 Visual State Dropdown Pills
Elegant, micro-pill indicators represent complex status and category states:
- **Job Statuses**: `application submitted` (Blue), `in progress` (Purple), `interview` (Amber), `accepted` (Emerald), and `rejection` (Rose).
- **Job Types**: `full time`, `part time`, `contract`, `internship`, and `volunteer`.
- **Progress Flags**: Toggleable `Applied` and `Heard Back` binary states with real-time responsive color shifting.

### 💾 Zero-Latency Autosave
All data persists locally using custom `localStorage` listeners, guaranteeing that your application records remain intact even after closing tabs, restarting your computer, or experiencing brief connectivity interruptions.

### 📱 Premium Native Mobile Feeling
Optimized specifically for mobile viewports using advanced CSS Media Queries and event-blocking logic:
- **Mobile Splash Screen**: A beautiful loading splash showing the minimalist logo before the dashboard is initialized.
- **Aspect Ratio Locking**: Blocks two-finger pinch zooming and rapid-tap resizing to maintain pixel-perfect styling ratios on iOS and Android devices.
- **Auto-Zoom Prevention**: Input elements default to exactly `16px` on mobile viewports to prevent iOS Safari from automatically zooming in and altering the UI scale during text input.

---

## 🛠️ Tech Stack & Design System

- **Frontend Core**: [React 19](https://react.dev) (Functional Components, `useState`, `useEffect`, Custom Initializers)
- **Bundler & Dev Server**: [Vite 8](https://vite.dev) (Hot Module Replacement, blazing fast builds)
- **Styling Paradigm**: Vanilla CSS3 Custom Properties (No heavy CSS framework footprints, fully customizable design system tokens)
- **Typography**: [Montserrat](https://fonts.google.com/specimen/Montserrat) (Weights: `400`, `500`, `600`, `700` for striking headers and legible text)

---

## 📁 Directory Architecture

```bash
folja/
├── public/                # Static assets and icons
├── src/
│   ├── assets/            # Project-specific vector files
│   ├── components/        # Reusable interface components
│   │   ├── DropdownPill.jsx  # Customized accessible selection pill
│   │   └── JobCard.jsx       # Interactive application card (Vertical/Horizontal)
│   ├── App.css            # Component-level styling overrides
│   ├── App.jsx            # Core Orchestrator, filters, and global states
│   ├── index.css          # Design system variables, animations, layout utilities
│   └── main.jsx           # Application entrypoint
├── index.html             # HTML Shell & Google Font imports
├── package.json           # Dependencies and build scripts
└── vite.config.js         # Bundler overrides
```

---

## 🚀 Quick Start

Follow these steps to spin up your local development environment:

### 1. Clone the repository
```bash
git clone https://github.com/torreyramirezdesign/folja.git
cd folja
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Spin Up Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to start tracking your applications.

### 4. Build for Production
```bash
npm run build
```
This outputs highly optimized static assets to the `/dist` directory, ready to be deployed to Netlify, Vercel, or custom hosting.

---

## 🎨 CSS Variables & Theming tokens

**följa** is built on top of robust theme custom properties. Feel free to tweak them in `src/index.css` to fit your personal brand:

```css
:root {
  --bg-color: #0B0E14;
  --surface-color: rgba(25, 30, 40, 0.6);
  --surface-border: rgba(255, 255, 255, 0.08);
  --text-primary: #F3F4F6;
  --text-secondary: #9CA3AF;
  
  --accent-color: #6366F1;
  --accent-hover: #4F46E5;
  
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.

---

<div align="center">
  <sub>Designed and crafted with passion by Torrey Ramirez Design.</sub>
</div>
