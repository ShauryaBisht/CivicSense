# 🏛️ CivicFix — Intelligent Civic Issue Reporting & Management Platform

**CivicFix** is a modern, responsive, and production-ready municipal issue reporting and workflow management web application built with **React (JavaScript & JSX)**, **Tailwind CSS**, and **Leaflet Maps**.

CivicFix empowers everyday citizens to report infrastructure, sanitation, electrical, and safety hazards, tracks transparent resolution in real time, and equips municipal operations coordinators and field crews with intelligent triage, automated ticket routing, and proof-of-work verification.

---

## 🌟 Key Application Workflows & Features

### 1. 👥 Citizen (Public User) Experience
- **4-Step "Report an Issue" Wizard (`ReportWizardModal.jsx`)**:
  - **Step 1: Media Evidence**: Drag-and-drop photo upload with instant preview and sample incident quick-pickers.
  - **Step 2: Geolocation & Pin Placement**: Interactive Leaflet map with draggable pin placement, click-to-pin, address lookup, and browser GPS auto-detection.
  - **Step 3: Smart AI Categorization & Urgency (`aiDetector.js`)**: Intelligent AI analysis engine that parses issue description and keywords to auto-suggest category (*Infrastructure, Sanitation, Electrical, Water & Drainage, Public Safety, Parks & Recreation*) and urgency (*Low, Medium, High, Emergency*) with confidence ratings and reasoning.
  - **Step 4: Review & Live Launch**: Generates unique tracking ticket numbers (e.g., `#CIVIC-8492`), triggers celebratory confetti (`canvas-confetti`), and initiates live tracking.
- **Public Feed & Map Explorer (`CitizenFeed.jsx` & `MapExplorer.jsx`)**:
  - Toggle between **Card Grid View**, **Interactive Map View**, and **Split View**.
  - Color-coded pins with pulsing radar beacons for Code Crimson emergencies.
  - Real-time search by keywords, street address, and ticket ID.
  - Multi-filtering by Category, Urgency, Status, and Sorting by Most Endorsed, Newest, and Urgency.
- **Community Endorsement & Discussion**:
  - Live upvoting mechanism to elevate ticket priority in the municipal queue.
  - Community comment threads with verified municipal authority badges.
- **Before / After Resolution Transparency (`BeforeAfterSlider.jsx`)**:
  - Interactive draggable comparison slider showing original reported hazard side-by-side with verified municipal proof-of-work.
- **Resolution Verification & Quality Rating**:
  - Citizen 5-star quality rating widget and option to verify fix or reopen ticket if the issue persists.

---

### 2. 🛡️ Municipal Admin / Field Authority Operations
- **Operations Command Dashboard (`AdminDashboard.jsx`)**:
  - **Key Metrics**: Total Incidents, Active Work Orders, Code Crimson Emergency alerts, Resolved Today, and SLA turnaround compliance.
  - **Emergency Alert Banner**: Live alert ticker highlighting unresolved emergency hazards with instant dispatch buttons.
  - **Department Workload Distribution**: Visual capacity meters across 6 municipal agencies (Public Works, Sanitation, Water, Electrical Grid, Safety, Parks).
  - **Kanban Board**: 5-column drag-and-move workflow (`Submitted` → `Under Review` → `Assigned` → `In Progress` → `Resolved`).
  - **Data Table View**: Full filterable table with quick status dropdowns, search, print orders, and CSV export.
- **Municipal Management Drawer (`AdminManageDrawer.jsx`)**:
  - Reassign responsible municipal department.
  - Dispatch specialized field teams and supervisors with direct contact numbers.
  - Update target ETAs and official audit log entries.
  - Upload "Proof of Work" resolution photos to resolve tickets.

---

### 3. 🎨 Design & UI/UX Standards
- **Color Palette**:
  - Deep Slate Navy (`#0F172A`)
  - Civic Emerald/Teal (`#0D9488`)
  - Muted Warm Amber (`#F59E0B`)
  - Crimson Danger (`#EF4444`)
  - Crisp Surface Gray (`#F8FAFC`)
- **Typography & Accessibility**: WCAG 2.1 AA compliant contrast, Plus Jakarta Sans typography, JetBrains Mono for ticket IDs.
- **Pure JavaScript & JSX**: Configured in pure modern JS without TypeScript overhead.

---

## 📁 Project Architecture

```
├── index.html                    # Root HTML with Google Fonts & favicon
├── package.json                  # Dependencies (React, Tailwind, Leaflet, Lucide)
├── vite.config.js                # Vite configuration with Tailwind CSS v4
└── src
    ├── main.jsx                  # Application entry point
    ├── App.jsx                   # Layout shell, view switcher & modals
    ├── index.css                 # Tailwind v4, Leaflet custom styling & animations
    ├── context
    │   └── CivicContext.jsx      # Central state management & LocalStorage persistence
    ├── data
    │   └── mockIssues.js         # Realistic pre-populated civic incidents dataset
    ├── utils
    │   └── aiDetector.js         # AI categorization and urgency detection heuristics
    └── components
        ├── Header.jsx            # Responsive navigation, role toggle & alert bell
        ├── NotificationDrawer.jsx# Municipal alert feed and notification drawer
        ├── CitizenFeed.jsx       # Public feed, hero stats, search & filter grid
        ├── InteractiveMap.jsx    # Leaflet interactive map with custom pins & popups
        ├── MapExplorer.jsx       # Dedicated full-screen map explorer view
        ├── ReportWizardModal.jsx # 4-step issue reporting wizard with AI scanner
        ├── IssueDetailModal.jsx  # Detailed ticket drawer, timeline & rating
        ├── BeforeAfterSlider.jsx # Touch/mouse draggable before/after comparison
        ├── AdminDashboard.jsx    # Municipal command dashboard, Kanban & table
        ├── AdminManageDrawer.jsx # Dispatch, crew assignment & proof upload
        ├── ToastContainer.jsx    # Dynamic toast alerts
        └── Footer.jsx            # Hotlines, accessibility badge & policy links
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

---

## 🛠️ Testing the Platform
1. **Toggle Roles**: Click the **Citizen / Admin** toggle in the top-right header to switch between citizen view and municipal operations command.
2. **Report a New Hazard**: Click **"Report Issue"**, pick a sample photo or upload one, drag the map pin or click "Auto-detect GPS", type a description to run the **AI Smart Scan**, and submit.
3. **Inspect Before & After**: Open resolved ticket `#CIVIC-8340` or `#CIVIC-8290` to test the interactive Before/After comparison slider.
4. **Manage in Admin Ops**: Switch to **Admin Portal**, view the Kanban board, and click **"Manage"** on any ticket to reassign crews or upload proof of work.
5. **Reset Data**: Click the reset icon in the header at any time to return to the default rich dataset.
