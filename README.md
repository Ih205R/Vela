# Vela

**Modern Website Builder DSL**

Vela is a domain-specific language (DSL) for building modern, responsive websites using clean declarative syntax. Write simple, readable code and compile it to production-ready HTML, CSS, and JavaScript.

## Features

- 🎨 **Beautiful Design** - Modern, responsive layouts with customizable themes
- ⚡ **Lightning Fast** - Instant compilation with optimized output
- 📝 **Clean Syntax** - Intuitive, readable code that's easy to learn
- 🔧 **Production Ready** - Generates semantic HTML5, modern CSS, and minimal JavaScript
- 🚀 **Developer Friendly** - Built-in dev server with hot reload
- 📦 **Zero Config** - Sensible defaults, start building immediately

## Installation

```bash
npm install -g vela
```

Or install locally in your project:

```bash
npm install vela
```

## Quick Start

### 1. Create a new project

```bash
vela init my-website
cd my-website
```

### 2. Build your site

```bash
vela build
```

### 3. Start development server

```bash
vela dev
```

Open http://localhost:3000 in your browser!

## Language Syntax

### Basic Structure

```vela
site "My Website" {
  
  theme {
    primary "#6C5CE7"
    background "#0B1020"
    text "#EAF0FF"
  }

  page "/" {
    // Components go here
  }
}
```

### Components

#### Hero Section

```vela
hero {
  title "Build websites with Vela"
  subtitle "Modern Website Builder DSL"
  button "Get Started" -> "/docs"
}
```

#### Section with Cards

```vela
section "Features" {
  
  card {
    title "Fast"
    text "Compile instantly"
  }

  card {
    title "Simple"
    text "Readable syntax"
  }
}
```

#### Footer

```vela
footer {
  text "© 2026 My Website"
}
```

## CLI Commands

### `vela init <project-name>`

Creates a new Vela project with the following structure:

```
my-website/
├── src/
│   └── main.vela       # Main Vela source file
├── dist/               # Compiled output (generated)
├── vela.config.json    # Configuration file
└── README.md
```

### `vela build`

Compiles your Vela source files to HTML, CSS, and JavaScript:

- `dist/index.html` - Semantic HTML5
- `dist/styles.css` - Modern, responsive CSS
- `dist/app.js` - Minimal JavaScript

### `vela dev`

Starts a local development server with:

- Live file watching
- Automatic recompilation on changes
- Hot reload support
- Default port: 3000 (configurable with `-p`)

```bash
vela dev -p 8080
```

## Configuration

Create a `vela.config.json` file in your project root:

```json
{
  "src": "src",
  "dist": "dist",
  "entry": "main.vela"
}
```

## Project Structure

```
vela/
├── src/
│   ├── cli/                    # Command-line interface
│   │   ├── cli.ts
│   │   └── commands/
│   │       ├── init.ts
│   │       ├── build.ts
│   │       └── dev.ts
│   ├── compiler/               # Compiler core
│   │   ├── compiler.ts
│   │   ├── parser.ts
│   │   ├── lexer.ts
│   │   └── ast.ts
│   ├── generator/              # Code generators
│   │   ├── html-generator.ts
│   │   ├── css-generator.ts
│   │   └── js-generator.ts
│   ├── std/                    # Standard library
│   │   ├── theme.ts
│   │   ├── hero.ts
│   │   ├── section.ts
│   │   ├── card.ts
│   │   ├── button.ts
│   │   └── footer.ts
│   └── utils/                  # Utilities
│       ├── file-utils.ts
│       ├── logger.ts
│       └── errors.ts
├── bin/
│   └── vela.js                 # CLI entry point
├── examples/
│   └── basic-site/
│       └── main.vela
├── package.json
├── tsconfig.json
└── README.md
```

## Language Specification

### Tokens

- **Keywords**: `site`, `theme`, `page`, `hero`, `section`, `card`, `button`, `footer`, `title`, `subtitle`, `text`
- **Symbols**: `{`, `}`, `->`, `"`
- **Literals**: String literals in double quotes
- **Comments**: `//` for line comments, `/* */` for block comments

### Grammar

```
Site        → "site" STRING "{" Theme? Page+ "}"
Theme       → "theme" "{" Property+ "}"
Page        → "page" STRING "{" Component* "}"
Component   → Hero | Section | Card | Button | Footer
Hero        → "hero" "{" Property+ "}"
Section     → "section" STRING? "{" Component* "}"
Card        → "card" "{" Property+ "}"
Button      → "button" STRING ("->" STRING)?
Footer      → "footer" "{" Property+ "}"
Property    → IDENTIFIER STRING
```

## Examples

### Minimal Example

```vela
site "Hello World" {
  page "/" {
    hero {
      title "Hello, World!"
      subtitle "Welcome to Vela"
    }
  }
}
```

### Full-Featured Example

See `examples/basic-site/main.vela` for a comprehensive example with:
- Custom theme
- Hero section with call-to-action
- Multiple sections with cards
- Footer

## Development

### Building from Source

```bash
git clone https://github.com/yourusername/vela.git
cd vela
npm install
npm run build
```

### Running Locally

```bash
npm link
vela init test-site
cd test-site
vela build
vela dev
```

## Architecture

### Compilation Pipeline

1. **Lexer** - Tokenizes source code
2. **Parser** - Builds Abstract Syntax Tree (AST)
3. **Validator** - Validates AST structure
4. **Generators** - Generate HTML, CSS, and JavaScript
5. **Writer** - Outputs files to dist/

### Extensibility

Vela is designed for future extensibility:

- **Plugin System** - Ready for custom components
- **Multiple Exports** - Extensible to React, Vue, Next.js
- **AI Integration** - Prepared for AI-powered generation
- **Icon Libraries** - Ready for icon system integration

## Roadmap

- [ ] Component library expansion
- [ ] Plugin system
- [ ] React/Vue/Next.js exporters
- [ ] Theme marketplace
- [ ] Visual editor
- [ ] AI-powered site generation
- [ ] Database integration
- [ ] Authentication modules
- [ ] API integration

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

MIT License - see LICENSE file for details

## Credits

Built with TypeScript, Node.js, and modern web technologies.

---

**Made with ❤️ by the Vela team**