# Smart Crop Advisory System for Small and Marginal Farmers

A desktop application that provides crop recommendations, weather advisories, soil guidance, and fertilizer information specifically designed for Indian small and marginal farmers.

## Problem Statement

Small and marginal farmers in India often lack access to timely, relevant agricultural advice. They need simple, easy-to-understand guidance on which crops to grow based on their local conditions including soil type, climate, water availability, and season. This application aims to bridge that gap by providing a user-friendly desktop tool that offers practical crop advisory.

## Objectives

- Provide location and condition-based crop recommendations
- Offer weather-related farming advisories
- Guide farmers on soil preparation and irrigation
- Share general fertilizer guidance
- Allow saving and reviewing past recommendations
- Present all information in simple, farmer-friendly language

## Features

- **Dashboard** — Welcome screen with farm overview and quick actions
- **Smart Crop Advisory** — Rule-based crop recommendations based on region, soil, season, and irrigation
- **Weather Advisory** — Temperature, rainfall, and farming precautions
- **Soil & Irrigation Guidance** — Soil preparation and water management tips
- **Fertilizer Guide** — Growth-stage based nutrient and fertilizer information
- **Saved Recommendations** — Persistent storage of crop recommendations
- **Farmer Profile** — Farm and farmer information management
- **Help & About** — Usage instructions and agricultural glossary

## Technology Stack

| Technology | Purpose |
|-----------|---------|
| **Electron** | Desktop application shell |
| **React 18** | Frontend UI framework |
| **Vite** | Build tooling and dev server |
| **Node.js** | Application runtime |
| **localStorage** | Persistent local data storage |
| **CSS** | Styling and responsive layouts |

## Architecture

```
desktop_project/
├── electron/           # Electron main process
│   ├── main.js         # Main process entry
│   └── preload.js      # Secure preload bridge
├── src/                # React frontend
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages
│   ├── services/       # Business logic & data
│   ├── data/           # Crop knowledge dataset
│   └── styles/         # CSS stylesheets
├── tests/              # Automated tests
├── package.json
├── vite.config.js
└── index.html
```

## Installation

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Setup
```bash
# Clone the repository
git clone https://github.com/dhruvchillguy/Smart-Crop-Advisory-System-for-Small-and-Marginal-Farmers.git
cd Smart-Crop-Advisory-System-for-Small-and-Marginal-Farmers

# Install dependencies
npm install
```

## Running the Application

### Development Mode (Browser)
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### Desktop Application (Electron)
```bash
npm run electron:dev
```

### Production Build
```bash
npm run build
npm run electron:build
```

## Testing
```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Limitations

- Weather data uses sample/manual entry; live weather requires an API key
- Crop recommendations are rule-based and intended as general guidance only
- The crop knowledge dataset covers common Indian crops but is not exhaustive
- This is a decision-support tool, not a substitute for local agricultural extension services

## Disclaimer

⚠️ **Important**: This application provides **general agricultural guidance** based on commonly known farming practices. Actual crop selection should consider local soil test results, current weather forecasts, market conditions, and advice from agricultural extension officers. The recommendations are not guaranteed and should be used as one input among many in farming decisions.

## License

MIT License

## Author

Dhruv Khare — College Desktop Application Project
