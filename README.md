# Frontend Config App

A React SPA with runtime configuration support, designed to consume external APIs through environment-injected configuration.

## Features

- **Runtime Configuration**: Load API URLs and settings at container startup
- **Health Profile Management**: Create, view, and manage health profiles
- **File Upload**: PDF document upload functionality
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Docker Ready**: Production-ready containerization

## Quick Start

### Development
```bash
npm install
npm run dev
```

### Docker Build
```bash
docker build -t frontend-config-app .
docker run -p 8080:80 \
  -e API_URL=http://localhost:3001/api \
  -e APP_NAME="Health Profile App" \
  frontend-config-app
```

### Environment Variables

- `API_URL`: Backend API endpoint (default: http://localhost:3001/api)
- `APP_NAME`: Application display name
- `NODE_ENV`: Environment (development/production)

## Architecture

The app loads configuration from `/assets/runtime-config.json` which is generated at container startup from environment variables using the entrypoint script.

## CI/CD

GitHub Actions automatically builds and pushes container images to GitHub Container Registry on push to main/develop branches.