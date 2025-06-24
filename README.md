# 🏥 Health Dashboard

A comprehensive full-stack health profile management system built with modern web technologies and AWS cloud services.

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for responsive styling
- **Vite** for fast development and building
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database with AWS RDS
- **AWS Cognito** for authentication
- **AWS S3** for document storage
- **JWT** token-based security

### Cloud Services
- **AWS Cognito** - User authentication and management
- **AWS S3** - Secure document storage with user-specific folders
- **AWS RDS** - PostgreSQL database hosting

## ✨ Features

### 🔐 Authentication
- ✅ User registration with email verification
- ✅ Secure login/logout with JWT tokens
- ✅ Password-based authentication via AWS Cognito
- ✅ Session management with automatic cleanup

### 👤 Profile Management
- ✅ Create comprehensive health profiles
- ✅ Edit existing profile information
- ✅ View profile details in clean interface
- ✅ Dynamic form validation

### 📄 Document Management
- ✅ Upload PDF documents (max 10MB)
- ✅ Automatic old file cleanup when uploading new documents
- ✅ Secure document viewing with direct S3 access
- ✅ File validation and error handling

### 🎨 User Experience
- ✅ Responsive design for all devices
- ✅ Clean, intuitive interface
- ✅ Real-time feedback and notifications
- ✅ Smooth navigation flow

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- AWS Account with Cognito and S3 configured
- PostgreSQL database (AWS RDS recommended)

### Backend Setup
```bash
cd health-api
npm install
cp .env.example .env
# Configure your AWS credentials in .env
npm start
```

### Frontend Setup
```bash
cd health-dash
npm install
cp .env.example .env
# Configure your API URL and Cognito settings in .env
npm start
```

### Testing
```bash
# Run unit tests
npm test

# Run tests in watch mode during development
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Run smoke tests (requires backend to be running)
npm run smoke
```

### Docker Deployment
```bash
# Quick start with Docker
cp .env.docker .env
# Edit .env with your AWS credentials
docker-compose up -d

# Access application
# Frontend: http://localhost
# Backend: http://localhost:8080/api

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### AWS Configuration
1. **Create S3 Bucket:**
```bash
aws s3 mb s3://health-dashboard-documents --region ap-south-1
aws s3api put-public-access-block --bucket health-dashboard-documents --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false
```

2. **Set up Cognito User Pool** with email verification enabled

3. **Configure RDS PostgreSQL** instance

## 🔧 Technical Highlights

### Security
- JWT-based authentication with AWS Cognito
- Authenticated API endpoints with middleware
- Secure file upload with validation
- Environment-based configuration

### Testing
- Unit tests with Vitest and React Testing Library
- API and service mocking
- Smoke tests for critical functionality
- Test coverage reporting

### Database
- Clean PostgreSQL schema with proper relationships
- Automated database migrations
- User-specific data isolation
- Optimized queries with connection pooling

### File Storage
- User-specific S3 folders (`userId/document.pdf`)
- Automatic old file cleanup on new uploads
- File type and size validation
- Public read access for document viewing

### Development
- TypeScript for type safety
- Environment variable configuration
- Error handling and logging
- Responsive UI components

### Deployment
- Docker containerization with multi-stage builds
- Docker Compose orchestration
- Production-ready Nginx configuration
- Health checks and monitoring

## 📁 Project Structure

```
health-dash/                 # Frontend React application
├── src/
│   ├── components/         # Reusable UI components
│   ├── services/          # API and authentication services
│   ├── utils/             # Utility functions and helpers
│   ├── __tests__/         # Test files
│   │   ├── smoke/         # Smoke tests
│   │   └── setup.ts       # Test setup
│   └── config.ts          # Configuration management
├── Dockerfile             # Frontend container configuration
├── nginx.conf             # Nginx configuration
├── vitest.config.ts        # Test configuration
├── vitest.smoke.config.ts  # Smoke test configuration
├── CONTRIBUTING.md        # Contribution guidelines
├── .env.example           # Example environment variables

health-api/                 # Backend Node.js API
├── src/
│   ├── routes/            # API route handlers
│   ├── middleware/        # Authentication and validation
│   ├── utils/             # Database and utility functions
│   └── index.js           # Main server file
├── Dockerfile             # Backend container configuration
├── healthcheck.js         # Container health check
├── .env.example           # Example environment variables

# Docker Configuration
├── docker-compose.yml      # Multi-service orchestration
├── .env.docker            # Docker environment template
├── DOCKER.md              # Docker deployment guide
```

## 🌟 Key Achievements

This project demonstrates:
- **Full-stack development** with modern JavaScript/TypeScript
- **Cloud integration** with multiple AWS services
- **Security best practices** with proper authentication
- **Database design** with PostgreSQL and migrations
- **File handling** with secure upload and storage
- **Responsive UI/UX** with clean, professional design
- **Production-ready code** with error handling and validation
- **Comprehensive testing** with unit tests and smoke tests
- **Developer documentation** with code comments and contribution guidelines
- **Docker containerization** with multi-service orchestration
- **Production deployment** ready with health checks and monitoring

## 🚀 Production Deployment

The application is designed to be production-ready with:
- Environment-based configuration
- Proper error handling and logging
- Secure authentication and authorization
- Scalable cloud architecture
- Clean code structure and documentation

### Docker Deployment
The application includes complete Docker containerization:
- **Multi-stage builds** for optimized images
- **Docker Compose** for service orchestration
- **Health checks** for all services
- **Production-ready** Nginx configuration
- **PostgreSQL** database with persistence
- **Security best practices** with non-root users

```bash
# Deploy with Docker
docker-compose up -d
```

## 📖 Documentation

- [README.md](README.md) - Project overview and setup
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [DEVELOPMENT.md](DEVELOPMENT.md) - Detailed development guide
- [DOCKER.md](DOCKER.md) - Docker deployment guide

---

Built with ❤️ using React, Node.js, and AWS Cloud Services