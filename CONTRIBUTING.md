# Contributing to Health Dashboard

Thank you for considering contributing to the Health Dashboard project! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- AWS account with Cognito and S3 access

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/health-dash.git
   cd health-dash
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Testing

### Running Tests
- Run all tests:
  ```bash
  npm test
  ```

- Run tests in watch mode:
  ```bash
  npm run test:watch
  ```

- Run tests with coverage:
  ```bash
  npm run test:coverage
  ```

- Run smoke tests (requires backend to be running):
  ```bash
  npm run smoke
  ```

### Writing Tests
- Unit tests should be placed in `src/__tests__/` directory
- Test files should follow the naming convention `*.test.ts` or `*.test.tsx`
- Use Vitest and React Testing Library for tests

## Code Style

### TypeScript
- Use TypeScript for all new code
- Add proper type annotations
- Avoid using `any` type when possible

### React Components
- Use functional components with hooks
- Use TypeScript interfaces for props
- Add JSDoc comments for component documentation

### Styling
- Use Tailwind CSS for styling
- Follow the existing design patterns

## Pull Request Process

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them with descriptive commit messages

3. Run tests to ensure your changes don't break existing functionality:
   ```bash
   npm test
   ```

4. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a pull request against the `main` branch

## Documentation

- Update documentation when adding or modifying features
- Add JSDoc comments to functions and components
- Update README.md if necessary

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help maintain a positive community

Thank you for contributing to Health Dashboard!