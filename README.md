# Calendar Sharing PWA (Single-User Prototype)

This repository contains the first iteration of a Progressive Web App for shared personal calendars. It currently implements single-user calendar functionality with event creation, editing, and local persistence.

## 🚀 Quick Start (Local)

### Prerequisites
- Node.js 16+ and npm

### Install dependencies
```bash
npm install
```

### Start the app
```bash
npm start
```

Open <http://localhost:3000> in your browser.

## 🐳 Docker / Codespaces (Recommended)

This repo includes configuration to run in a GitHub Codespace or via Docker for a consistent development environment.

### Run with Docker
```bash
docker compose up
```

Then visit <http://localhost:3000>.

### Run in GitHub Codespaces
1. Open the repository in GitHub Codespaces.
2. The container will build automatically using `.devcontainer/devcontainer.json`.
3. The app will start and should be accessible on port **3000**.

## 🧩 Project Structure

```
src/
├── components/
│   ├── Calendar.tsx          # Main calendar component
│   ├── Calendar.css          # Calendar styling
│   ├── EventModal.tsx        # Event creation/editing modal
│   └── EventModal.css        # Modal styling
├── types.ts                  # TypeScript type definitions
├── App.tsx                   # Main application component
├── App.css                   # App-level styling
└── index.tsx                 # Application entry point
```

## 🧪 Available Scripts
- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## 📌 Next Iterations (Planned)
- Excel upload / bulk event import
- Authentication + user identity
- Calendar sharing + permissions
- Real-time collaboration (WebSockets)
- PWA offline support
