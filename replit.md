# Diana Keffer Portfolio

## Overview
This is a modern Next.js portfolio website featuring interactive shader backgrounds and responsive design. Originally created with v0.app, this project has been successfully imported and configured for the Replit environment.

## Project Architecture
- **Framework**: Next.js 14.2.16 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI components for accessibility
- **Shaders**: Custom WebGL shader backgrounds using @paper-design/shaders-react
- **Fonts**: Figtree, Instrument Serif, and Geist Mono

## Development Setup
- **Port**: Configured for port 5000 with 0.0.0.0 host binding
- **Dev Server**: Next.js development server with hot reload
- **Package Manager**: npm (dependencies already installed)

## Recent Changes (Setup)
- 2025-09-09: Initial project import and Replit environment setup
- Configured Next.js for Replit proxy compatibility
- Set up development workflow on port 5000
- Configured deployment settings for autoscale production deployment
- Removed problematic webpack configurations that caused ES module issues

## User Preferences
- Clean, modern portfolio design
- Interactive shader backgrounds
- Responsive layout for all devices
- Professional presentation of work and experience

## Deployment Configuration
- **Target**: Autoscale (stateless web application)
- **Build**: npm run build
- **Run**: npm start
- **Environment**: Production-ready Next.js static export

## File Structure
- `app/` - Next.js app router pages and layouts
- `components/` - React components including UI and custom components
- `data/` - Resume and portfolio data in JSON format
- `lib/` - Utility functions and data fetchers
- `public/` - Static assets including images
- `types/` - TypeScript type definitions