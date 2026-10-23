# Smart Crop Advisory System for Small and Marginal Farmers

A secure, offline-capable desktop application built with **Electron**, **React 18**, and **Vite** that provides explainable crop recommendations, weather advisories, soil guidance, and fertilizer management specifically tailored for Indian small and marginal farmers.

---

## 🌾 Problem Statement

Small and marginal farmers (owning < 2 hectares) account for over 85% of operational farm holdings in India. They frequently face challenges due to:
- Limited access to timely, localized agronomic advice.
- Unreliable internet connectivity in rural farmland.
- Complex agricultural terminology and opaque recommendation systems.
- Suboptimal crop choices, improper irrigation scheduling, and unbalanced fertilizer application.

This application provides an intuitive, high-contrast, bilingual-friendly desktop decision-support system that operates reliably offline.

---

## 🎯 Key Objectives

- **Explainable Crop Selection**: Multi-factor scoring engine matching state, soil texture, season (Kharif/Rabi), irrigation availability, temperature, and rainfall.
- **Offline-First Resilience**: Full local persistence using Electron IPC with filesystem storage (`userData/smart-crop-data.json`) and graceful browser fallback (`localStorage`).
- **Targeted Soil & Irrigation Guidance**: Tailored preparation techniques, drainage requirements, and water management rules for 7 major Indian soil types.
- **Balanced Fertilizer Advisory**: Growth-stage specific NPK and organic manure recommendations for staple Indian crops.
- **Farmer-Friendly UI**: Designed with WCAG AA compliant contrast, large touch-friendly typography, and Hindi/English dual terminology.

---

## 🖥️ Application Architecture

```
desktop_project/
├── electron/
│   ├── main.js             # Electron main process (IPC handlers, secure window management)
│   └── preload.js          # Context-isolated IPC bridge exposing window.electronAPI
├── src/
│   ├── main.jsx            # React root mount
│   ├── App.jsx             # App layout & view router
│   ├── components/
│   │   └── Sidebar.jsx     # Navigation shell with profile indicator & offline badges
│   ├── pages/
│   │   ├── Dashboard.jsx            # Welcome overview, quick stats, farm snapshot
│   │   ├── FarmerProfile.jsx        # Farmer details, landholding, soil & irrigation setup
│   │   ├── CropAdvisory.jsx         # Multi-factor advisory engine form & scoring display
│   │   ├── Weather.jsx              # Weather input, temperature alerts & seasonal precautions
│   │   ├── SoilIrrigation.jsx       # Deep-dive soil characteristics & watering advice
│   │   ├── FertilizerGuide.jsx      # Stage-wise NPK dosage & safety precautions
│   │   ├── SavedRecommendations.jsx # Local persistence manager (view, inspect, delete)
│   │   └── HelpAbout.jsx            # User guide, farming glossary, and disclaimers
│   ├── services/
│   │   ├── advisoryEngine.js        # Transparent rule-based agronomic scoring engine
│   │   └── storage.js               # IPC / localStorage abstraction layer
│   ├── data/
│   │   ├── cropData.js              # Knowledge base for 12+ major Indian crops
│   │   └── referenceData.js         # States, soils, seasons, fertilizer stages, and precautions
│   └── styles/
│       └── index.css                # Accessible design system with CSS custom properties
├── tests/
│   ├── advisoryEngine.test.js       # Scoring algorithms, validation, and label tests
│   └── cropDataAndStorage.test.js   # Dataset integrity and schema verification tests
├── index.html                       # HTML template
├── vite.config.js                   # Vite bundler & Vitest test runner configuration
└── package.json                     # Dependency manifests and run scripts
```

---

## 🛠️ Technology Stack

| Component | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Desktop Shell** | Electron | ^32.1.2 | Native cross-platform window, filesystem access, IPC bridge |
| **Frontend Framework** | React | ^18.3.1 | Declarative component UI & reactive state management |
| **Bundler & Dev Server** | Vite | ^5.4.8 | Lightning-fast HMR and production bundle optimization |
| **Testing Framework** | Vitest | ^2.1.2 | Automated unit & data integrity testing |
| **Styling** | Vanilla CSS3 | Modern CSS | Custom CSS variables, responsive flex/grid, accessible colors |
| **Persistence** | Node.js `fs` / JSON | Native | Local encrypted application data storage |

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### Step 1: Clone the Repository
```bash
git clone https://github.com/dhruvchillguy/Smart-Crop-Advisory-System-for-Small-and-Marginal-Farmers.git
cd Smart-Crop-Advisory-System-for-Small-and-Marginal-Farmers
```

### Step 2: Install Dependencies
```bash
npm install
```

---

## 💻 Running the Application

### Option A: Desktop Application (Production Mode — Recommended for Demo)
Builds the frontend bundle and immediately opens the native Electron application:
```bash
npm run electron:prod
```
*Alternatively, you can run `npm run build` followed by `npm start`.*

### Option B: Desktop Application (Development Mode)
Launches Vite dev server with Hot Module Replacement connected to Electron:
```bash
npm run electron:dev
```

### Option C: Browser Development Mode
Runs the UI in any web browser without Electron (using `localStorage` fallback):
```bash
npm run dev
```
Navigate to: `http://localhost:5173`

---

## 🧪 Automated Testing

The project includes unit and data integrity test suites running on Vitest:
```bash
# Run all automated tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Coverage Highlights:
- **Rule Scoring Accuracy**: Verifies multi-parameter weights for state, soil, season, and water access.
- **Edge-Case Handling**: Tests missing inputs, incompatible soil-crop pairings, and invalid seasons.
- **Agronomic Dataset Validation**: Enforces required properties across all crop entries in `cropData.js`.
- **Reference Integrity**: Verifies state coverage, soil profiles, and fertilizer stage definitions.

---

## 👨‍🏫 Faculty Demonstration Script

To present this project to examiners or faculty, follow these sequential steps:

1. **Launch Desktop App**:
   Run `npm run electron:prod`. Point out the native Electron window framing and clean agricultural theme.
2. **Dashboard Overview**:
   Highlight the quick stat cards ("Crops in Database: 12", "Active Season: Kharif / Rabi", "Offline Mode: Active").
3. **Setup Farm Profile ("My Farm")**:
   - Enter farmer name (e.g., *Ramesh Kumar*), State (*Punjab* or *Uttar Pradesh*), Farm Area (*2.5 Acres*), Soil Type (*Alluvial*), Irrigation (*Yes*).
   - Click **Save Profile**. Show that data persists immediately.
4. **Generate Crop Recommendations ("Crop Advice")**:
   - The form pre-fills from the profile.
   - Select season (*Rabi*).
   - Click **Get Crop Recommendations**.
   - Show the resulting cards (e.g., *Wheat* with high match percentage, transparent scoring reasons, water requirements, and sowing instructions).
   - Click **Save This Recommendation**. Notice the toast notification.
5. **Inspect Saved Recommendations ("Saved Advice")**:
   - Navigate to **Saved Advice** to view the saved Wheat advisory record.
   - Demonstrate deleting or reviewing past advice.
6. **Show Soil & Irrigation Guidance**:
   - Select *Black Soil* or *Alluvial Soil* to reveal tailored preparation tips, drainage requirements, and suitable crops.
7. **Show Fertilizer Guide**:
   - Select *Rice (Paddy)* or *Wheat* to display basal, tillering, and flowering stage NPK guidelines with safety warnings.
8. **Demonstrate Automated Tests**:
   - Run `npm test` in the terminal to show all test suites passing.

---

## ⚠️ Agricultural & Technical Disclaimer

> **Educational & Decision-Support Notice:**
> This desktop application is built as an academic engineering project to demonstrate software architecture, rule-based inference, and offline desktop development for rural settings. 
> Actual farming recommendations must always be verified with local agronomic authorities, soil testing laboratories, and Krishi Vigyan Kendra (KVK) extension officers.

---

## 📄 License

This project is licensed under the **MIT License**.
Developed by **Dhruv Khare** for College Desktop Application Examination.
