# Project Setup Guide

## Environment Requirements
- Node.js Version: 22.11.0 (LTS)
- Package Manager: pnpm

## Installation Steps

### 1. Install PNPM
First, install PNPM globally to replace NPM as your package manager:
```bash
npm install -g pnpm
```

### 2. Clone the Project
Clone the repository from Git:
```bash
git clone <repository-url>
```
> Note: Replace `<repository-url>` with your actual repository URL

### 3. Navigate to Backend
```bash
cd <project-name>/backend
```

### 4. Install Dependencies
Install all required project dependencies:
```bash
pnpm install
```

### 5. Run Development Server
Start the development server:
```bash
pnpm run dev
```

## Additional Information
- This is a local project currently under development
- Make sure you have the correct Node.js version installed before proceeding
- The backend needs to be running for the application to work properly

## Troubleshooting
If you encounter any issues:
1. Verify Node.js version matches the requirement: `node --version`
2. Ensure PNPM is properly installed: `pnpm --version`
3. Check if all dependencies were installed correctly in the `node_modules` folder