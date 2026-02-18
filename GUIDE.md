# Vela Language Guide

## Complete Language Reference

### Table of Contents
1. [Getting Started](#getting-started)
2. [Language Syntax](#language-syntax)
3. [Components](#components)
4. [Theming](#theming)
5. [Advanced Usage](#advanced-usage)
6. [Best Practices](#best-practices)

## Getting Started

### Installation

```bash
npm install -g vela
```

### Create Your First Site

```bash
vela init my-first-site
cd my-first-site
vela build
vela dev
```

## Language Syntax

### Site Declaration

Every Vela file starts with a `site` declaration:

```vela
site "My Website" {
  // theme and pages go here
}
```

### Comments

```vela
// This is a line comment

/*
  This is a
  block comment
*/
```

### String Literals

Use double quotes for all strings:

```vela
title "Hello, World!"
text "This is a description"
```

## Components

### Hero

The hero component creates a full-screen landing section.

**Syntax:**
```vela
hero {
  title "Main Heading"
  subtitle "Subheading text"
  button "Call to Action" -> "/target-page"
}
```

**Properties:**
- `title` (optional) - Main heading
- `subtitle` (optional) - Subheading text
- `button` (optional) - Call-to-action button with optional link

**Example:**
```vela
hero {
  title "Build Amazing Websites"
  subtitle "With the power of Vela DSL"
  button "Start Building" -> "#features"
}
```

### Section

Sections organize content into logical groups.

**Syntax:**
```vela
section "Section Title" {
  // Components go here
}
```

**Example:**
```vela
section "Our Services" {
  card {
    title "Service 1"
    text "Description of service 1"
  }
  
  card {
    title "Service 2"
    text "Description of service 2"
  }
}
```

### Card

Cards display contained content with title and text.

**Syntax:**
```vela
card {
  title "Card Title"
  text "Card content"
}
```

**Example:**
```vela
card {
  title "Fast Performance"
  text "Lightning-fast load times and optimal performance"
}
```

### Button

Standalone buttons for actions.

**Syntax:**
```vela
button "Button Text" -> "/link"
button "Button Text"  // Without link
```

**Example:**
```vela
button "Learn More" -> "/docs"
button "Contact Us" -> "/contact"
```

### Footer

Footer section for site information.

**Syntax:**
```vela
footer {
  text "Footer content"
}
```

**Example:**
```vela
footer {
  text "© 2026 My Company. All rights reserved."
}
```

## Theming

### Theme Configuration

Customize your site's appearance with a theme block:

```vela
site "My Site" {
  
  theme {
    primary "#6C5CE7"      // Primary color (buttons, accents)
    background "#0B1020"    // Background color
    text "#EAF0FF"          // Text color
  }
  
  // pages...
}
```

### Color Values

Colors must be in hexadecimal format:
- 6-digit: `#RRGGBB` (e.g., `#6C5CE7`)
- 3-digit: `#RGB` (e.g., `#F00`)

### Default Theme

If no theme is specified, Vela uses these defaults:
- Primary: `#6C5CE7` (Purple)
- Background: `#0B1020` (Dark Blue)
- Text: `#EAF0FF` (Light Blue)

## Advanced Usage

### Multi-Section Layouts

```vela
site "Complex Site" {
  
  theme {
    primary "#FF6B6B"
    background "#1A1A2E"
    text "#FFFFFF"
  }

  page "/" {
    
    hero {
      title "Welcome"
      subtitle "To our amazing website"
      button "Explore" -> "#about"
    }

    section "About Us" {
      card {
        title "Our Story"
        text "We started in 2026..."
      }
    }

    section "Services" {
      card {
        title "Web Design"
        text "Beautiful, responsive designs"
      }
      card {
        title "Development"
        text "Fast, scalable applications"
      }
      card {
        title "Consulting"
        text "Expert technical advice"
      }
    }

    section "Contact" {
      card {
        title "Get in Touch"
        text "We'd love to hear from you"
      }
    }

    footer {
      text "© 2026 Our Company"
    }
  }
}
```

### Nested Components

Sections can contain multiple cards and other components:

```vela
section "Features" {
  card {
    title "Feature 1"
    text "Description 1"
  }
  card {
    title "Feature 2"
    text "Description 2"
  }
  card {
    title "Feature 3"
    text "Description 3"
  }
}
```

## Best Practices

### 1. Structure Your Content

Organize content hierarchically:
- Use hero for landing/intro
- Use sections to group related content
- Use cards within sections for individual items
- Use footer for closing information

### 2. Consistent Naming

Use descriptive, consistent names:

```vela
site "My Portfolio" {
  page "/" {
    hero {
      title "Jane Doe - Web Developer"
      subtitle "Building beautiful web experiences"
    }
  }
}
```

### 3. Theme Colors

Choose accessible color combinations:
- Ensure sufficient contrast between text and background
- Test your theme in light and dark environments
- Use consistent color schemes across your site

### 4. Content Length

Keep content concise:
- Titles: 2-10 words
- Subtitles: 5-15 words
- Card text: 1-2 sentences

### 5. Link Structure

Use semantic anchor links:

```vela
button "View Features" -> "#features"
button "Contact" -> "#contact"
```

## Common Patterns

### Landing Page

```vela
site "Product Landing" {
  page "/" {
    hero {
      title "Revolutionary Product"
      subtitle "Change the way you work"
      button "Get Started" -> "#features"
    }

    section "Features" {
      // Feature cards
    }

    section "Pricing" {
      // Pricing cards
    }

    footer {
      text "© 2026 Product Inc."
    }
  }
}
```

### Portfolio Site

```vela
site "My Portfolio" {
  page "/" {
    hero {
      title "Your Name"
      subtitle "Your Title"
    }

    section "Projects" {
      card {
        title "Project 1"
        text "Description"
      }
      // More projects...
    }

    section "Skills" {
      // Skill cards
    }

    footer {
      text "© 2026 Your Name"
    }
  }
}
```

### Business Site

```vela
site "Business Name" {
  theme {
    primary "#2E86AB"
    background "#F6F6F6"
    text "#333333"
  }

  page "/" {
    hero {
      title "Business Tagline"
      subtitle "What you do"
      button "Learn More" -> "#services"
    }

    section "Services" {
      // Service cards
    }

    section "About" {
      // About cards
    }

    footer {
      text "© 2026 Business Name"
    }
  }
}
```

## File Organization

### Recommended Structure

```
my-project/
├── src/
│   └── main.vela          # Your Vela source
├── dist/                  # Generated output
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── vela.config.json       # Configuration
└── README.md              # Documentation
```

### Configuration File

`vela.config.json`:
```json
{
  "src": "src",
  "dist": "dist",
  "entry": "main.vela"
}
```

## Troubleshooting

### Common Errors

**"Site must have a name"**
```vela
// ❌ Wrong
site {
  page "/" { }
}

// ✓ Correct
site "My Site" {
  page "/" { }
}
```

**"Page route must start with '/'"**
```vela
// ❌ Wrong
page "home" { }

// ✓ Correct
page "/" { }
```

**"Invalid color value"**
```vela
// ❌ Wrong
theme {
  primary "purple"
}

// ✓ Correct
theme {
  primary "#6C5CE7"
}
```

**"Unterminated string"**
```vela
// ❌ Wrong
title "Hello World

// ✓ Correct
title "Hello World"
```

## Next Steps

1. Explore the examples in `examples/basic-site/`
2. Experiment with different themes
3. Build your own components
4. Share your creations!

## Resources

- [GitHub Repository](https://github.com/vela-lang/vela)
- [Issue Tracker](https://github.com/vela-lang/vela/issues)
- [Discussions](https://github.com/vela-lang/vela/discussions)

---

Happy building with Vela! 🚀
