# Health Dashboard Frontend - Usage Guide

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your settings
```

3. **Start development server:**
```bash
npm start
# or
npm run dev
```

## Environment Variables

All frontend environment variables must be prefixed with `VITE_`:

- `VITE_API_URL` - Backend API URL
- `VITE_COGNITO_USER_POOL_ID` - AWS Cognito User Pool ID  
- `VITE_COGNITO_CLIENT_ID` - AWS Cognito Client ID
- `VITE_AWS_REGION` - AWS Region

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## Testing

```bash
# Run all checks
run-tests.bat
```