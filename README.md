# frontend-config-app

A production-ready React.js Single Page Application (SPA) designed for runtime configuration via Docker, suitable for multi-environment deployments (Dev, QA, Prod). The app is built using a multi-stage Dockerfile and served with a lightweight NGINX container. Runtime config is injected dynamically at container startup, enabling environment-specific values like API base URLs to be updated without rebuilding the image.

---

## 🚀 Features

- ⚛️ React app (bootstrapped with Create React App)
- 🐳 Multi-stage Docker build with Node.js and nginx:alpine
- 🔧 Supports runtime-configurable environment variables
- 🌐 Custom NGINX setup for SPA routing and config serving
- 🧩 Easily deployable to cloud platforms and CI/CD pipelines

---

## 🛠️ Tech Stack

| Layer          | Technology                 |
|----------------|----------------------------|
| Frontend       | React.js                   |
| Build Tool     | Node.js 20.19.1            |
| Web Server     | nginx:alpine               |
| Config Runtime | JSON file (`runtime-config.json`) |
| Container Tool | Docker                     |

---

## 📁 Project Structure

```
frontend-config-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   └── config/
│       └── runtime-config.js      # Loads runtime config
├── nginx.conf                     # NGINX config for SPA + config
├── Dockerfile                     # Multi-stage with config injection
├── .dockerignore
└── README.md
```

---

## 🔧 Runtime Configuration Pattern

The app supports loading config **dynamically at runtime** from a JSON file (`/assets/runtime-config.json`) which allows you to:

- Use the same Docker image across all environments
- Avoid rebuilding for simple config changes (e.g., API URLs)

### Sample `runtime-config.json`:

```json
{
  "REACT_APP_API_BASE_URL": "https://api.example.com"
}
```

### Accessing in Code:
```js
import config from './config/runtime-config';

const apiUrl = config.REACT_APP_API_BASE_URL;
```

---

## 🐳 Docker Usage

### 1. Build the image

```bash
docker build -t frontend-config-app .
```

### 2. Run the container

You can inject runtime values using environment variables or volume mounts, depending on how your entrypoint script is written.

```bash
docker run -d -p 8080:80   -e RUNTIME_config_REACT_APP_API_BASE_URL=https://api.dev.com   frontend-config-app
```

---

## ⚙️ NGINX Setup

The included `nginx.conf`:

- Serves the React build files
- Handles fallback routing for SPA (`try_files`)
- Serves `/assets/runtime-config.json` from disk (or volume)
  
---

## 🧪 Testing & Dev

While this repo is mainly geared for production, for local development:

```bash
npm install
npm start
```

> The runtime config logic may need to be mocked or adjusted for local dev.

---

## 📦 CI/CD Friendly

Supports CI/CD with tools like:

- GitHub Actions
- Docker Compose
- Kubernetes (EKS, ECS)
- AWS S3 + CloudFront (with custom entrypoint)

---

## 📜 License

MIT License  
© 2025 [@arunprabus](https://github.com/arunprabus)

---

## 🙌 Credits

Developed with ❤️ for scalable multi-environment frontend delivery using runtime config best practices.
