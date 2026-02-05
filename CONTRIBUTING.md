# Contributing to Weather Station Card

Thank you for your interest in contributing to Weather Station Card! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

Before creating a bug report:
1. Check the [existing issues](https://github.com/fappsde/weatherstation_card/issues) to avoid duplicates
2. Collect information about the bug (Home Assistant version, browser, etc.)
3. Use the bug report template when creating the issue

### Suggesting Features

Feature requests are welcome! Please:
1. Check existing feature requests first
2. Provide a clear use case
3. Use the feature request template

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes following our coding standards

4. Add tests for new functionality

5. Run the validation suite:
   ```bash
   npm run validate
   ```

6. Commit your changes with clear messages:
   ```bash
   git commit -m "feat: add new feature"
   ```

7. Push to your fork and create a pull request

## Development Setup

### Prerequisites

- Node.js 20 or higher
- npm
- Git

### Initial Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/weatherstation_card.git
cd weatherstation_card

# Install dependencies
npm install

# Build the project
npm run build
```

### Development Workflow

```bash
# Watch for changes during development
npm run watch

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Provide type annotations for function parameters and return values
- Avoid using `any` type unless absolutely necessary

### Code Style

We use ESLint and Prettier for code formatting:

- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- 100 character line length
- Trailing commas in ES5

Run `npm run format` to automatically format your code.

### Naming Conventions

- Use camelCase for variables and functions
- Use PascalCase for classes and types
- Use UPPER_CASE for constants
- Use kebab-case for file names

### Comments

- Write clear, concise comments
- Document complex logic
- Use JSDoc for public APIs
- Avoid obvious comments

## Testing

### Writing Tests

- Write tests for all new functionality
- Place tests in `src/__tests__/`
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)

### Test Coverage

We aim for at least 70% code coverage:
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

Check coverage with:
```bash
npm run test:coverage
```

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build process or tooling changes
- `ci`: CI/CD changes

### Examples

```
feat(card): add solar radiation display

Add support for displaying solar radiation data from WS90 sensor

Closes #123
```

```
fix(wind): correct wind direction calculation

The wind direction was off by 22.5 degrees due to rounding error

Fixes #456
```

## Documentation

When adding new features:

1. Update the README.md with usage examples
2. Update info.md if it affects HACS users
3. Add inline code comments for complex logic
4. Update TypeScript types and interfaces

## Building and Testing Locally

### Build

```bash
npm run build
```

The built file will be in `dist/weatherstation-card.js`.

### Test in Home Assistant

1. Copy `dist/weatherstation-card.js` to your Home Assistant `www` folder
2. Add it as a Lovelace resource
3. Clear browser cache
4. Test your changes

### Local Development Server

```bash
npm run watch
```

This will watch for changes and rebuild automatically.

## Release Process

Releases are handled by maintainers:

1. Version is updated in `package.json` and `src/const.ts`
2. Changes are documented in CHANGELOG.md
3. A git tag is created (e.g., `v1.0.0`)
4. GitHub Actions automatically builds and creates a release

## Getting Help

- Check the [README](README.md) for documentation
- Browse [existing issues](https://github.com/fappsde/weatherstation_card/issues)
- Ask questions in [Discussions](https://github.com/fappsde/weatherstation_card/discussions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
