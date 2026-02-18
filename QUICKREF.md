# Vela Quick Reference

## Installation
```bash
npm install -g vela
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `vela init <name>` | Create new project |
| `vela build` | Compile to HTML/CSS/JS |
| `vela dev` | Start dev server |
| `vela dev -p 8080` | Dev server on custom port |
| `vela version` | Show version |
| `vela help` | Show help |

## Basic Syntax

### Site Structure
```vela
site "Site Name" {
  theme { ... }
  page "/" { ... }
}
```

### Theme
```vela
theme {
  primary "#6C5CE7"
  background "#0B1020"
  text "#EAF0FF"
}
```

### Components

#### Hero
```vela
hero {
  title "Main Title"
  subtitle "Subtitle"
  button "Action" -> "/link"
}
```

#### Section
```vela
section "Title" {
  card { ... }
  card { ... }
}
```

#### Card
```vela
card {
  title "Card Title"
  text "Card content"
}
```

#### Button
```vela
button "Click Me" -> "/link"
```

#### Footer
```vela
footer {
  text "© 2026 Company"
}
```

## Comments
```vela
// Line comment
/* Block comment */
```

## File Structure
```
project/
├── src/
│   └── main.vela
├── dist/
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── vela.config.json
```

## Configuration (vela.config.json)
```json
{
  "src": "src",
  "dist": "dist",
  "entry": "main.vela"
}
```

## Color Format
- Hex 6-digit: `#RRGGBB`
- Hex 3-digit: `#RGB`
- Must start with `#`

## Generated Output

### HTML
- Semantic HTML5
- Accessibility-ready
- Mobile-first markup

### CSS
- Modern CSS3
- Flexbox/Grid layouts
- Responsive breakpoints
- CSS custom properties
- Smooth animations

### JavaScript
- Minimal footprint
- Smooth scrolling
- Navigation handling
- Intersection observers

## Best Practices

✅ **Do:**
- Use descriptive titles
- Keep content concise
- Use consistent themes
- Organize with sections
- Test on mobile

❌ **Don't:**
- Skip the site name
- Use non-hex colors
- Forget closing braces
- Use quotes in strings incorrectly
- Overcomplicate structure

## Common Patterns

### Landing Page
```vela
site "Product" {
  page "/" {
    hero { ... }
    section "Features" { ... }
    section "Pricing" { ... }
    footer { ... }
  }
}
```

### Portfolio
```vela
site "Portfolio" {
  page "/" {
    hero { ... }
    section "Projects" { ... }
    section "Skills" { ... }
    footer { ... }
  }
}
```

## Troubleshooting

| Error | Solution |
|-------|----------|
| Unterminated string | Add closing `"` |
| Invalid color | Use hex format `#RRGGBB` |
| Unexpected token | Check syntax, braces |
| File not found | Check paths in config |

## Resources

- 📖 Full Guide: `GUIDE.md`
- 🤝 Contributing: `CONTRIBUTING.md`
- 📝 Changelog: `CHANGELOG.md`
- 💡 Examples: `examples/`

## Version
Vela 1.0.0 - February 2026
