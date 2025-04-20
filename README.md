# PassportLink UI

PassportLink UI is a modern React application for OAuth-based authentication with support for multiple providers and account linking.

## Features

- Modern, clean UI built with React and Tailwind CSS
- Integration with PassportLink authentication backend
- Support for multiple OAuth providers (Google, GitHub, Facebook, Microsoft, LinkedIn)
- Account linking capabilities
- Responsive design for all device sizes
- TypeScript for better type safety and developer experience

## Tech Stack

- React with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Vite for fast development and optimized builds
- Axios for API communication

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- PassportLink backend running on http://localhost:3000

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:8080.

## Project Structure

```
src/
├─ components/
│  ├─ auth/           # Authentication-related components
│  ├─ profile/        # User profile components
│  ├─ layout/         # Layout components (header, footer)
├─ pages/             # Page components
├─ services/          # API services
├─ store/             # Redux store
├─ utils/             # Utility functions
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

## Backend Integration

This UI is designed to work with the PassportLink authentication backend, which should be running on http://localhost:3000. Make sure the backend is properly configured to accept requests from http://localhost:8080 (CORS).
