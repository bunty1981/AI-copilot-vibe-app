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
npm run dev
```

Open <http://localhost:3000> in your browser.

### Development Commands
- **Start dev server**: `npm run dev` (runs on port 3000)
- **Build for production**: `npm run build`
- **Lint code**: `npm run lint`
- **Run tests**: `npm test`
- **Preview build**: `npm run preview`

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
3. Once ready, run `npm run dev` to start the development server.
4. The app will be accessible on port **3000**.
5. Use the same [Development Commands](#development-commands) listed above for testing, building, and linting.

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
