# Vela - Complete Workflow Demo

## Step-by-Step Guide from Zero to Deployed Website

This document demonstrates the complete workflow of creating a website with Vela.

---

## Prerequisites

- Node.js 16+ installed
- Terminal/Command line access
- Text editor (optional)

---

## Step 1: Build Vela from Source

```bash
# Navigate to project
cd /Users/ihorromanenko/Documents/Vela

# Install dependencies
npm install

# Build the compiler
npm run build

# Make CLI executable
chmod +x bin/vela.js

# Optional: Link globally
npm link
```

**Expected Output:**
```
added 18 packages
✓ Build completed successfully
```

---

## Step 2: Create a New Project

```bash
# Create new project
node bin/vela.js init my-awesome-site

# Navigate into project
cd my-awesome-site
```

**Expected Output:**
```
🚀 Creating new Vela project: my-awesome-site
ℹ Creating project structure...
✓ Created src/main.vela
✓ Created vela.config.json
✓ Created README.md
✓ Created .gitignore

✓ ✨ Project my-awesome-site created successfully!
```

**Generated Structure:**
```
my-awesome-site/
├── src/
│   └── main.vela
├── vela.config.json
├── README.md
└── .gitignore
```

---

## Step 3: Review Generated Vela Code

The `src/main.vela` file contains:

```vela
site "my-awesome-site" {

  theme {
    primary "#6C5CE7"
    background "#0B1020"
    text "#EAF0FF"
  }

  page "/" {

    hero {
      title "Welcome to my-awesome-site"
      subtitle "Built with Vela - Modern Website Builder DSL"
      button "Get Started" -> "#features"
    }

    section "Features" {

      card {
        title "⚡ Fast"
        text "Lightning-fast compilation to production-ready code"
      }

      card {
        title "🎨 Beautiful"
        text "Modern, responsive design out of the box"
      }

      card {
        title "📝 Simple"
        text "Clean, readable syntax that's easy to learn"
      }

    }

    footer {
      text "© 2026 my-awesome-site. Built with Vela."
    }

  }

}
```

---

## Step 4: Build the Project

```bash
node ../bin/vela.js build
```

**Expected Output:**
```
🔨 Building Vela project...
ℹ Loaded vela.config.json
ℹ Reading src/main.vela...
ℹ Compiling...
ℹ Writing output files...
✓ Generated index.html
✓ Generated styles.css
✓ Generated app.js

✓ ✨ Build completed successfully!
ℹ Output directory: dist/
```

**Generated Files:**
```
my-awesome-site/
├── dist/
│   ├── index.html    (43 lines, semantic HTML5)
│   ├── styles.css    (201 lines, modern responsive CSS)
│   └── app.js        (75 lines, minimal JavaScript)
├── src/
│   └── main.vela
└── ...
```

---

## Step 5: Preview in Browser

### Option A: Development Server

```bash
node ../bin/vela.js dev
```

**Expected Output:**
```
🚀 Starting Vela development server...
🔨 Building Vela project...
ℹ Loaded vela.config.json
ℹ Reading src/main.vela...
ℹ Compiling...
ℹ Writing output files...
✓ Generated index.html
✓ Generated styles.css
✓ Generated app.js

✓ ✨ Build completed successfully!
ℹ Output directory: dist/

✨ Development server running!
   Local: http://localhost:3000

ℹ Watching for changes in src/...

Press Ctrl+C to stop
```

**Open browser:** http://localhost:3000

### Option B: Open HTML File Directly

```bash
open dist/index.html
```

---

## Step 6: Customize Your Site

Edit `src/main.vela`:

```vela
site "My Portfolio" {

  theme {
    primary "#FF6B6B"
    background "#1A1A2E"
    text "#FFFFFF"
  }

  page "/" {

    hero {
      title "Jane Doe"
      subtitle "Full Stack Developer & Designer"
      button "View Projects" -> "#projects"
    }

    section "Projects" {

      card {
        title "E-Commerce Platform"
        text "Built with React and Node.js, serving 10k+ users"
      }

      card {
        title "Mobile App"
        text "iOS/Android app with 50k+ downloads"
      }

      card {
        title "Open Source Library"
        text "Popular npm package with 1M+ downloads"
      }

    }

    section "Skills" {

      card {
        title "Frontend"
        text "React, Vue, TypeScript, CSS"
      }

      card {
        title "Backend"
        text "Node.js, Python, PostgreSQL"
      }

      card {
        title "DevOps"
        text "Docker, AWS, CI/CD"
      }

    }

    footer {
      text "© 2026 Jane Doe. Available for freelance work."
    }

  }

}
```

**Save file** → Dev server automatically rebuilds → **Refresh browser**

---

## Step 7: Deploy

The `dist/` folder contains production-ready files:

### Deployment Options:

**Static Hosts:**
- Netlify: Drag & drop `dist/` folder
- Vercel: `vercel dist/`
- GitHub Pages: Push `dist/` to gh-pages branch
- Cloudflare Pages: Connect git repo

**Traditional Hosting:**
- Upload `dist/` folder via FTP
- Point domain to folder

**Example: Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd dist
netlify deploy --prod
```

---

## What Gets Generated

### 1. index.html (Semantic HTML5)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="hero">
    <div class="hero-content">
      <h1 class="hero-title">Jane Doe</h1>
      <p class="hero-subtitle">Full Stack Developer & Designer</p>
      <a href="#projects" class="hero-button">View Projects</a>
    </div>
  </header>
  <!-- ... sections, cards, footer ... -->
  <script src="app.js"></script>
</body>
</html>
```

### 2. styles.css (Modern Responsive CSS)
- CSS custom properties for theming
- Mobile-first responsive design
- Flexbox/Grid layouts
- Smooth animations
- Optimized performance
- ~200 lines total

### 3. app.js (Minimal JavaScript)
- Smooth scrolling
- Navigation handling
- Intersection observers
- ~75 lines total

---

## File Sizes (Typical)

- **HTML**: ~2-5 KB
- **CSS**: ~4-6 KB
- **JS**: ~2-3 KB
- **Total**: ~10 KB (uncompressed)

With gzip: **~3-4 KB total**

---

## Development Workflow

### Daily Workflow:

1. **Start dev server:**
   ```bash
   vela dev
   ```

2. **Edit** `src/main.vela`

3. **Save** → Automatic rebuild

4. **Refresh** browser → See changes

5. **Repeat** 2-4

### Production Build:

1. **Build:**
   ```bash
   vela build
   ```

2. **Test** `dist/index.html`

3. **Deploy** `dist/` folder

---

## Advanced Examples

### Multi-Section Site

```vela
site "Business Site" {
  theme {
    primary "#2E86AB"
    background "#F6F6F6"
    text "#333333"
  }

  page "/" {
    hero {
      title "Acme Corporation"
      subtitle "Innovation in Technology"
      button "Learn More" -> "#about"
    }

    section "About Us" {
      card {
        title "Our Mission"
        text "Delivering cutting-edge solutions since 2020"
      }
    }

    section "Services" {
      card { title "Consulting" text "Expert advice" }
      card { title "Development" text "Custom software" }
      card { title "Support" text "24/7 assistance" }
    }

    section "Testimonials" {
      card {
        title "Amazing Service"
        text "Acme transformed our business - CEO, Tech Inc"
      }
    }

    footer {
      text "© 2026 Acme Corp. All rights reserved."
    }
  }
}
```

---

## Performance Metrics

**Lighthouse Scores (Typical):**
- Performance: 95-100
- Accessibility: 90-100
- Best Practices: 95-100
- SEO: 90-100

**Load Times:**
- First Contentful Paint: <1s
- Time to Interactive: <2s
- Total Load: <3s

---

## Troubleshooting

### Build fails
```bash
# Check syntax in main.vela
# Look for:
# - Missing closing braces }
# - Unclosed strings "
# - Invalid color formats
```

### Dev server won't start
```bash
# Check if port is in use
vela dev -p 8080  # Use different port
```

### Changes not appearing
```bash
# Ensure file is saved
# Check terminal for rebuild messages
# Hard refresh browser (Cmd+Shift+R)
```

---

## Next Steps

1. ✅ Explore `examples/` folder
2. ✅ Read `GUIDE.md` for complete syntax
3. ✅ Customize your theme
4. ✅ Add more sections and cards
5. ✅ Deploy to the web!

---

## Resources

- **Documentation**: README.md, GUIDE.md, QUICKREF.md
- **Examples**: examples/basic-site/, examples/showcase/
- **Source Code**: src/
- **Contributing**: CONTRIBUTING.md

---

## Success! 🎉

You now have:
- ✅ A working Vela compiler
- ✅ A beautiful website
- ✅ Production-ready HTML/CSS/JS
- ✅ Development workflow
- ✅ Deployment-ready files

**Build amazing websites with Vela!** 🚀
