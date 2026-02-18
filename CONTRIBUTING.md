# Contributing to Vela

Thank you for your interest in contributing to Vela! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn
- Git

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/vela.git
   cd vela
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Link for local testing:
   ```bash
   npm link
   ```

## Project Structure

```
vela/
├── src/
│   ├── cli/           # CLI commands
│   ├── compiler/      # Lexer, Parser, Compiler
│   ├── generator/     # Code generators
│   ├── std/          # Standard library
│   └── utils/        # Utilities
├── examples/         # Example Vela projects
├── bin/             # CLI entry point
└── dist/            # Compiled output
```

## Development Workflow

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Build and test:
   ```bash
   npm run build
   npm test  # When tests are available
   ```

4. Test manually:
   ```bash
   vela init test-project
   cd test-project
   vela build
   vela dev
   ```

### Code Style

- Use TypeScript strict mode
- Follow existing code conventions
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Use meaningful variable names

### Adding New Components

To add a new component:

1. Add token types to `src/compiler/lexer.ts`
2. Add AST node type to `src/compiler/ast.ts`
3. Update parser in `src/compiler/parser.ts`
4. Add generator logic in `src/generator/html-generator.ts`
5. Add CSS styles in `src/generator/css-generator.ts`
6. Create standard library file in `src/std/`

### Testing

Currently, testing is done manually. We welcome contributions for:

- Unit tests for lexer/parser
- Integration tests for compiler
- End-to-end tests for CLI

## Submitting Changes

### Pull Request Process

1. Ensure your code builds without errors
2. Update documentation if needed
3. Update CHANGELOG.md
4. Commit your changes:
   ```bash
   git commit -m "feat: add new feature"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request on GitHub

### Commit Message Convention

Use conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add image component
fix: resolve parser error with nested sections
docs: update installation instructions
```

## Areas for Contribution

### High Priority

- [ ] Test suite implementation
- [ ] Error message improvements
- [ ] Documentation enhancements
- [ ] Performance optimizations

### New Features

- [ ] Additional components (image, video, form)
- [ ] Plugin system
- [ ] Theme presets
- [ ] Export to React/Vue/Next.js
- [ ] Visual Studio Code extension

### Component Ideas

- Navigation component
- Grid layout component
- Image gallery component
- Form components
- Modal/Dialog component
- Accordion component
- Tabs component

## Bug Reports

When reporting bugs, please include:

1. Vela version (`vela version`)
2. Node.js version (`node --version`)
3. Operating system
4. Steps to reproduce
5. Expected behavior
6. Actual behavior
7. Minimal example `.vela` file

## Feature Requests

When requesting features:

1. Describe the use case
2. Provide examples of desired syntax
3. Explain expected output
4. Consider backwards compatibility

## Code Review

All submissions require review. We aim to:

- Respond to PRs within 48 hours
- Provide constructive feedback
- Maintain code quality
- Welcome new contributors

## Getting Help

- Open an issue for bugs
- Start a discussion for questions
- Join our community chat (coming soon)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

---

Thank you for contributing to Vela! 🎉
