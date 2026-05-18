# Project Setup Guide

## Overview

This document outlines the complete setup process for a design-driven React application using Vite, TypeScript, Redux Toolkit, and Tailwind CSS with the latest package versions.

## Tech Stack

### Core Technologies

- **React** 19.2.6 - UI library with latest features
- **TypeScript** ~6.0.2 - Type safety
- **Vite** 8.0.12 - Build tool and dev server
- **Tailwind CSS** 3.4.19 - Utility-first CSS framework

### State Management

- **Redux Toolkit** 2.11.2 - State management
- **React Redux** 9.2.0 - React bindings for Redux

### Authentication (Optional)

- **@azure/msal-browser** 5.10.1 - Azure AD authentication
- **@azure/msal-react** 5.4.1 - React wrapper for MSAL

### Routing

- **React Router DOM** 7.15.1 - Client-side routing

### Form Management & Validation

- **react-hook-form** 7.75.0 - Form handling and validation
- **@hookform/resolvers** 5.2.2 - Validation schema resolvers
- **zod** 4.4.3 - TypeScript-first schema validation

### Error Handling

- **react-error-boundary** 6.1.1 - Error boundary component

### Additional Libraries

- **axios** 1.16.1 - HTTP client

## Project Initialization

### 1. Create Vite Project

```bash
yarn create vite my-app --template react-ts
cd my-app
```

### 2. Install Dependencies

#### Core Dependencies

```bash
yarn add react react-dom react-router-dom
yarn add @reduxjs/toolkit react-redux
yarn add axios
yarn add react-hook-form @hookform/resolvers zod
yarn add react-error-boundary
```

#### Optional: Azure MSAL Authentication

```bash
yarn add @azure/msal-browser @azure/msal-react
```

#### Tailwind CSS Setup

```bash
yarn add -D tailwindcss postcss autoprefixer
yarn add -D @tailwindcss/vite
```

#### TypeScript Types

```bash
yarn add -D @types/react @types/react-dom
yarn add -D @types/node
yarn add -D typescript typescript-eslint
```

#### Dev Tools & Testing

```bash
yarn add -D @vitejs/plugin-react
yarn add -D eslint @eslint/js globals
yarn add -D eslint-plugin-react-hooks eslint-plugin-react-refresh
yarn add -D jest @types/jest ts-jest
yarn add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
yarn add -D jest-environment-jsdom identity-obj-proxy
```

### 3. Vite Configuration

Create `vite.config.ts`:

```typescript
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

### 4. TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

Create `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts", "tailwind.config.ts"]
}
```

### 5. Environment Variables

Create `.env` file:

```env
# App Configuration
VITE_APP_PATH=/

# API Endpoints
VITE_BASE_URL=https://your-api-base-url.com
VITE_MASTER_BASE_URL=https://your-master-api-url.com
VITE_SITE_ODATA_BASE_URL=https://your-odata-url.com

# Optional: Azure AD MSAL Configuration (if using authentication)
# VITE_MSAL_CLIENT_ID=your-client-id
# VITE_MSAL_AUTHORITY=https://login.microsoftonline.com/your-tenant-id
# VITE_MSAL_SCOPES=api://your-api-id/.default
```

### 6. Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "jest --passWithNoTests",
    "test:watch": "jest --watch",
    "test:ci": "jest --ci --runInBand"
  }
}
```

## Folder Structure

```
src/
├── assets/                 # Static assets
│   ├── images/            # Image files
│   └── svgs-icons/        # SVG icons
├── components/            # Shared components
├── contexts/              # React contexts
├── design-system-components/  # Design system components
├── hooks/                 # Custom hooks
├── Layout/                # Layout components
├── pages/                 # Page components
├── protectedRoute/        # Route guards
├── services/              # API services
├── store/                 # Redux store
│   └── slices/           # Redux slices
├── App.tsx               # Root component
├── main.tsx              # Entry point
├── Router.tsx            # Route configuration
├── auth-config.ts        # MSAL configuration
├── api.ts                # API utilities
├── utils.ts              # Utility functions
└── index.css             # Global styles
```

## Next Steps

1. ✅ Set up authentication (see [AUTHENTICATION_SYSTEM.md](./02_AUTHENTICATION_SYSTEM.md))
2. ✅ Configure routing (see [ROUTING_STRUCTURE.md](./06_ROUTING_STRUCTURE.md))
3. ✅ Set up Redux store (see [STATE_MANAGEMENT.md](./05_STATE_MANAGEMENT.md))
4. ✅ Implement design system (see [DESIGN_SYSTEM.md](./04_DESIGN_SYSTEM.md))
5. ✅ Create layout components (see [LAYOUT_STRUCTURE.md](./03_LAYOUT_STRUCTURE.md))

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Key Features

- ⚡ **Fast Development** - Vite's instant HMR
- 🔒 **Secure Authentication** - Azure AD integration
- 📦 **State Management** - Redux Toolkit
- 🎨 **Design System** - Consistent UI components
- 🛣️ **Type-Safe Routing** - React Router with TypeScript
- 🎯 **Path Aliases** - Clean imports with `@/`
- 🔧 **Modern Tooling** - ESLint, TypeScript, Tailwind CSS
