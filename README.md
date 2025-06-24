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

## 📁 Project Structure

```
health-dash/                 # Frontend React application
├── src/
│   ├── components/         # Reusable UI components
│   ├── services/          # API and authentication services
│   └── config.ts          # Configuration management

health-api/                 # Backend Node.js API
├── src/
│   ├── routes/            # API route handlers
│   ├── middleware/        # Authentication and validation
│   ├── utils/             # Database and utility functions
│   └── index.js           # Main server file
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

## 🚀 Production Deployment

The application is designed to be production-ready with:
- Environment-based configuration
- Proper error handling and logging
- Secure authentication and authorization
- Scalable cloud architecture
- Clean code structure and documentation

---

Built with ❤️ using React, Node.js, and AWS Cloud Services