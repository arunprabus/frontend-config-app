# Development Guide

This document provides detailed information for developers working on the Health Dashboard project.

## Development Environment

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Start development server:
   ```bash
   npm start
   ```

## Testing

### Running Tests

The project uses Vitest for testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Run smoke tests (requires backend to be running)
npm run smoke
```

### Test Structure

- **Unit Tests**: Located in `src/__tests__/`
- **Smoke Tests**: Located in `src/__tests__/smoke/`
- **Test Setup**: Configuration in `src/__tests__/setup.ts`

### Writing Tests

Example unit test:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '../components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Code Organization

### Directory Structure

- `src/components/`: React components
- `src/services/`: API and authentication services
- `src/utils/`: Utility functions and helpers
- `src/__tests__/`: Test files

### Key Files

- `src/App.tsx`: Main application component
- `src/config.ts`: Configuration management
- `src/services/auth.service.ts`: Authentication service
- `src/utils/api.ts`: API utilities
- `src/utils/validation.ts`: Form validation utilities
- `src/utils/logger.ts`: Logging utilities

## Utilities

### API Utilities

The `src/utils/api.ts` file provides functions for API calls:

```typescript
// GET request
const response = await get('/profile');

// POST request
const response = await post('/profile', profileData);

// File upload
const response = await uploadFile('/upload', file);
```

### Validation

The `src/utils/validation.ts` file provides validation functions:

```typescript
// Validate email
const isValid = isValidEmail('user@example.com');

// Validate form data
const { isValid, error } = validateProfileForm(formData);
```

### Logging

The `src/utils/logger.ts` file provides logging functions:

```typescript
// Log levels
logger.debug('Debug message', 'ModuleName');
logger.info('Info message', 'ModuleName');
logger.warn('Warning message', 'ModuleName');
logger.error('Error message', 'ModuleName', error);
```

## Build and Deployment

### Building for Production

```bash
npm run build
```

This creates a production build in the `dist/` directory.

### Environment Configuration

- Development: `.env.development`
- Production: `.env.production`
- Test: `.env.test`

## Troubleshooting

### Common Issues

1. **Authentication Issues**:
   - Check Cognito configuration in `.env`
   - Verify user pool and client ID

2. **API Connection Issues**:
   - Ensure backend is running
   - Check API URL in `.env`

3. **Test Failures**:
   - Check mock setup in test files
   - Verify environment variables in `setup.ts`