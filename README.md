# Screenshot Exact Match

Amaravati Solar Solutions web application and services.

## Project Structure

```
screenshot-exact-match-main/
├── backend/       # Node.js & Express REST API server
├── frontend/      # TanStack Start / React web application
├── scratch/       # Scratchpad scripts and artifacts
├── .gitignore     # Git ignore patterns
├── AGENTS.md      # Repository agent guidelines
├── package.json   # Root workspace task runner
└── README.md      # Project overview and documentation
```

## Running the Project

### 1. Frontend Development Server (Port 8080)
From the root directory:
```sh
npm run dev
```
Or directly within the frontend folder:
```sh
cd frontend
npm run dev
```

### 2. Backend API Server (Port 5000)
From the root directory:
```sh
npm run dev:backend
```
Or directly within the backend folder:
```sh
cd backend
npm run dev
```

### 3. Build Frontend for Production
```sh
npm run build
```
