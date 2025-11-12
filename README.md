# Section 21 Notice Validity Checker

A concise, client-side React wizard that helps landlords assess whether a Section 21 notice is valid. It walks the user through a decision-tree questionnaire based on UK legislation, explains the reasoning for each question, and returns a clear VALID / INVALID / GREY-AREA outcome with an explanation.

<!-- GitHub Actions Pages deploy status -->
[![Pages Deploy](https://github.com/jameshunt8082/Section21Validation/actions/workflows/deploy.yml/badge.svg)](https://github.com/jameshunt8082/Section21Validation/actions/workflows/deploy.yml)

Short blurb for posting (Gemini / social):
> Section 21 Notice Validity Checker — a lightweight React + Tailwind wizard that guides landlords through the key statutory checks for serving a Section 21 notice in England. Fast, privacy-first, and educational: answers are processed in the browser and the app explains why a notice may be invalid.

## Technology Stack

### Core Framework
- **React 18+** - Modern UI framework for building component-based user interfaces
- **Vite (recommended v7+)** - Fast build tool and development server; requires Node 20+ for the latest recommended release

### Styling
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development and responsive design

### Build Tools
- **PostCSS** - CSS processing with autoprefixer for cross-browser compatibility
- **Autoprefixer** - Automatically adds vendor prefixes to CSS

## Project Overview

This application implements a decision-tree questionnaire based on UK housing legislation regarding Section 21 notices. The tool covers six main areas:

1. **Preliminary Checks** - Date validation, notice periods, and expiration rules
2. **Tenant Fees & Prohibited Payments** - Compliance with Tenant Fees Act 2019
3. **Deposit Protection** - Tenancy Deposit Protection scheme requirements
4. **Mandatory Documentation** - EPC, Gas Safety Certificate, and 'How to Rent' guide
5. **Licensing and Property Condition** - HMO licensing and retaliatory eviction protections
6. **Form and Final Checks** - Form 6A compliance and fixed-term requirements

## Features

- **Interactive Questionnaire** - Step-by-step wizard interface with conditional logic
- **Educational Content** - Learning points for each question with links to relevant legislation
- **Progress Tracking** - Visual indicators showing progress through sections
- **Result Assessment** - Clear VALID/INVALID determination with specific reasons
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v20+ recommended) — the project runs under Node 20 when using the latest Vite release
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173` or the port Vite selects)

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
landlord_project/
├── src/
│   ├── components/       # React components
│   ├── data/             # Questionnaire data structure (question metadata & learning points)
│   ├── utils/            # Navigation logic and scoring placeholder
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles with Tailwind directives
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── postcss.config.js     # PostCSS configuration
```

## Development
The application is a single-page wizard using React state (`useReducer`) to implement a decision tree: each answer routes to the next question or returns a final result. The questionnaire data is driven from `src/data/questionnaire.js`, making it easy to update questions, learning points, and branching logic without changing UI code.

### Key Components

- **QuestionWizard** - Manages the overall questionnaire flow and state
- **QuestionCard** - Displays individual questions with answer options
- **ResultPage** - Shows the final assessment result
- **ProgressIndicator** - Visual progress tracking
- **LearningPoint** - Educational content display
 - **LearningPoint** - Educational content display

## For posting to LLMs (Gemini, etc.)
Use the short blurb at the top for social/LLM posting. If you want a longer description for the post, use the following (copy-paste):

```
Section 21 Notice Validity Checker — a small, privacy-first React + Tailwind app that helps landlords verify whether a Section 21 notice is valid. It runs entirely in the browser, follows a clear decision-tree based on common statutory checks (dates, deposit protection, prescribed information, documentation, licensing and form compliance) and explains why a notice may be invalid. Suitable as a quick educational tool or prototype to integrate with legal workflows.
```

## Notes & Contact
- This tool is informational only and not legal advice.
- If you want a ready-made deployable build or a hosted demo link for sharing, I can add a GitHub Actions workflow to build and publish the `dist/` site to GitHub Pages or another host.

## License

This project is for educational and informational purposes. It is not a substitute for professional legal advice.

## License

This project is for educational and informational purposes. It is not a substitute for professional legal advice.

## Author

Manus AI - November 2025

