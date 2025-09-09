# CI/CD Setup Documentation

## Overview

This project uses GitHub Actions for continuous integration and Vercel for deployment. The CI/CD pipeline ensures code quality through automated testing and type checking before deployment.

## Workflows

### 1. Test & Build (`test.yml`)
**Triggers:** Push to `main`, Pull Requests to `main`

**Steps:**
- ✅ Type checking with TypeScript
- ✅ Unit and integration tests with Jest
- ✅ Build verification
- ✅ Test coverage reporting

### 2. Full CI/CD Pipeline (`ci.yml`)
**Triggers:** Push to `main`/`develop`, Pull Requests to `main`

**Features:**
- Multi-node testing (Node 18.x, 20.x)
- Security audit with `pnpm audit`
- Vercel preview deployments for PRs
- Code coverage upload to Codecov

## Required Secrets (for ci.yml)

To enable full CI/CD functionality, add these secrets to your GitHub repository:

### Vercel Integration
\`\`\`
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id  
VERCEL_PROJECT_ID=your_project_id
\`\`\`

### How to get Vercel secrets:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to Settings → Tokens → Create new token
3. Copy the token and add as `VERCEL_TOKEN`
4. For org/project IDs, check your project settings in Vercel

## Local Development Commands

\`\`\`bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Type checking
npx tsc --noEmit

# Build project
pnpm build

# Development server
pnpm dev
\`\`\`

## Vercel Integration

This project is configured for Vercel deployment with:
- Automatic deployments on `main` branch pushes
- Preview deployments for pull requests
- Environment variables managed through Vercel dashboard

## Quality Gates

The CI pipeline enforces these quality gates:
- ✅ All TypeScript types must be valid
- ✅ All tests must pass (27 tests covering navigation, auth, layout)
- ✅ Project must build successfully
- ✅ No critical security vulnerabilities

## Test Coverage

Current test coverage includes:
- Navigation between all sections
- Admin login (success/failure scenarios)
- Job detail modal functionality
- Layout and scrolling behavior
- Error boundary handling
- Component rendering and styling
