# CLAUDE.md - Development Guide

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run lint` - Run eslint
- `npm run preview` - Preview production build
- `npm test` - Run all tests
- `npm test -- -t "test name"` - Run specific test

## Code Style Guidelines
- **TypeScript/React**: Use strict typing with explicit interfaces/types for props
- **Formatting**: 2-space indentation, single quotes, semicolons
- **Components**: Functional components with hooks (useState, useEffect, useRef)
- **Imports**: Group component imports before utilities, use path aliases (@/ for src)
- **Styling**: Tailwind CSS with clsx/tailwind-merge for conditional classes
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Error Handling**: Proper type annotations for events, cleanup in useEffect

## Project Structure
- `/src/artifacts/` - Main application components (DX Core 4 resources)
- `/src/components/` - Reusable UI components 
- `/src/lib/` - Utility functions and shared logic