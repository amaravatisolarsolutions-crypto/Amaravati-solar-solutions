# Amaravati Solar Solutions

Full-stack web application and REST API for Amaravati Solar Solutions.

## Project Structure

```
Amaravati-solar-solutions/
├── backend/            # Node.js & Express REST API server (Port 5000)
├── docker/             # Docker configuration files
│   ├── Dockerfile.backend
│   └── Dockerfile.frontend
├── frontend/           # TanStack Start / React 19 / Vite web application (Port 8080)
├── scratch/            # Scratchpad scripts and testing assets
├── deploy/             # Deployment configurations (Hostinger Apache/PHP bridge backup)
├── .env                # Local environment variables (git-ignored)
├── .env.example        # Example environment configuration template
├── .gitignore          # Git ignore specifications
├── docker-compose.yml  # Multi-container orchestration (Backend + Frontend + MySQL)
├── package.json        # Root workspace task runner
└── README.md           # Project documentation
```

## Running the Project Locally

### 1. Frontend Development Server (Port 8080)
```sh
npm run dev
```
Accessible at: [http://localhost:8080](http://localhost:8080)

### 2. Backend API Server (Port 5000)
```sh
npm run dev:backend
```
Accessible at: [http://localhost:5000](http://localhost:5000)

### 3. Docker Compose (Full Stack + MySQL)
```sh
docker-compose up --build
```

### 4. Production Build
```sh
npm run build
```
Build outputs are generated inside `frontend/dist/`.
