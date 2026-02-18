/**
 * CSS Generator for Vela
 * Generates modern, responsive CSS from AST
 */

import * as AST from '../compiler/ast';

export class CSSGenerator {
  private theme: Map<string, string> = new Map();

  // Default theme values
  private defaults = {
    primary: '#6C5CE7',
    background: '#0B1020',
    text: '#EAF0FF',
    cardBg: '#1A2332',
    spacing: '1rem',
  };

  generate(ast: AST.SiteNode): string {
    // Extract theme
    if (ast.theme) {
      ast.theme.properties.forEach((prop: AST.ThemeProperty) => {
        this.theme.set(prop.key, prop.value);
      });
    }

    const primary = this.theme.get('primary') || this.defaults.primary;
    const background = this.theme.get('background') || this.defaults.background;
    const text = this.theme.get('text') || this.defaults.text;
    const cardBg = this.theme.get('cardBg') || this.defaults.cardBg;

    return `
/* Vela Generated Styles */

/* CSS Reset & Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-primary: ${primary};
  --color-background: ${background};
  --color-text: ${text};
  --color-card-bg: ${cardBg};
  --spacing-unit: 1rem;
  --max-width: 1200px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: var(--color-background);
  color: var(--color-text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, var(--color-background) 0%, #1a1a2e 100%);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--color-primary), #a29bfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: var(--color-text);
  opacity: 0.9;
  margin-bottom: 2rem;
}

.hero-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
}

.hero-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(108, 92, 231, 0.6);
}

/* Section */
.section {
  padding: 5rem 2rem;
  max-width: var(--max-width);
  margin: 0 auto;
}

.section-content {
  width: 100%;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* Card */
.card {
  background: var(--color-card-bg);
  padding: 2rem;
  border-radius: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
  font-weight: 600;
}

.card-text {
  color: var(--color-text);
  opacity: 0.85;
  line-height: 1.7;
}

/* Button */
.button {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108, 92, 231, 0.4);
}

/* Footer */
.footer {
  background: rgba(0, 0, 0, 0.3);
  padding: 3rem 2rem;
  margin-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  max-width: var(--max-width);
  margin: 0 auto;
  text-align: center;
}

.footer-text {
  color: var(--color-text);
  opacity: 0.7;
}

/* Responsive Design */
@media (max-width: 768px) {
  .section {
    padding: 3rem 1rem;
  }

  .section-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .hero {
    min-height: 80vh;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero, .section, .card {
  animation: fadeIn 0.6s ease-out;
}
`.trim();
  }
}
