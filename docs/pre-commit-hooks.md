# Pre-commit Hooks Documentation

## Overview

This project uses Husky and lint-staged to automatically run quality checks before each commit. This ensures code quality and prevents broken code from being committed to the repository.

## What Runs on Pre-commit

When you make a commit, the following checks automatically run on staged files:

### For TypeScript/JavaScript files (`*.{js,jsx,ts,tsx}`):
1. **Type Checking** - TypeScript compiler checks for type errors
2. **Testing** - Jest runs tests related to the changed files
3. **Code Formatting** - Prettier formats the code consistently

### For other files (`*.{json,css,md}`):
1. **Code Formatting** - Prettier formats the files

## How It Works

1. **Husky** - Installs Git hooks automatically when `npm install` runs
2. **lint-staged** - Runs linting tools only on staged Git files (not the entire codebase)
3. **Pre-commit Hook** - Located in `.husky/pre-commit`, runs before each commit

## Installation

The pre-commit hooks are automatically installed when you run:
\`\`\`bash
npm install
\`\`\`

## Manual Testing

You can manually test the pre-commit checks by running:
\`\`\`bash
npm run pre-commit
\`\`\`

## Configuration Files

### `.husky/pre-commit`
Contains the Git hook that triggers lint-staged

### `package.json` - lint-staged section
Defines what commands run for which file types:
\`\`\`json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "./node_modules/.bin/tsc --noEmit",
      "./node_modules/.bin/jest --bail --findRelatedTests --passWithNoTests",
      "./node_modules/.bin/prettier --write"
    ],
    "*.{json,css,md}": [
      "./node_modules/.bin/prettier --write"
    ]
  }
}
\`\`\`

### `.prettierrc`
Prettier configuration for consistent code formatting

## Troubleshooting

### If pre-commit hooks aren't running:
1. Make sure `.husky/pre-commit` is executable: `chmod +x .husky/pre-commit`
2. Reinstall hooks: `npm run prepare`

### If tools can't be found:
- The configuration uses direct paths to `./node_modules/.bin/` for WSL compatibility
- Make sure all dependencies are installed: `npm install`

### To bypass hooks (emergency only):
\`\`\`bash
git commit --no-verify -m "emergency commit"
\`\`\`
**⚠️ Use sparingly - this skips all quality checks!**

## Benefits

✅ **Prevents broken code** from being committed
✅ **Consistent formatting** across the entire codebase  
✅ **Faster feedback** - catch issues before CI/CD
✅ **Automatic fixing** - Prettier formats code automatically
✅ **Only checks changed files** - fast execution
