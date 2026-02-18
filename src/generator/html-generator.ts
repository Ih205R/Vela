/**
 * HTML Generator for Vela
 * Generates semantic HTML5 from AST
 */

import * as AST from '../compiler/ast';

export class HTMLGenerator {
  private indentLevel = 0;
  private theme: Map<string, string> = new Map();

  generate(ast: AST.SiteNode): string {
    // Extract theme if present
    if (ast.theme) {
      ast.theme.properties.forEach((prop: AST.ThemeProperty) => {
        this.theme.set(prop.key, prop.value);
      });
    }

    const html: string[] = [];

    html.push('<!DOCTYPE html>');
    html.push('<html lang="en">');
    html.push('<head>');
    html.push('  <meta charset="UTF-8">');
    html.push('  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
    html.push(`  <title>${this.escapeHtml(ast.name)}</title>`);
    html.push('  <link rel="stylesheet" href="styles.css">');
    html.push('</head>');
    html.push('<body>');

    // Generate page content
    if (ast.pages.length > 0) {
      const page = ast.pages[0]; // For now, handle first page
      page.children.forEach((component: AST.ComponentNode) => {
        html.push(this.generateComponent(component, 1));
      });
    }

    html.push('  <script src="app.js"></script>');
    html.push('</body>');
    html.push('</html>');

    return html.join('\n');
  }

  private generateComponent(node: AST.ComponentNode, indent: number): string {
    switch (node.type) {
      case 'Hero':
        return this.generateHero(node, indent);
      case 'Section':
        return this.generateSection(node, indent);
      case 'Card':
        return this.generateCard(node, indent);
      case 'Button':
        return this.generateButton(node, indent);
      case 'Footer':
        return this.generateFooter(node, indent);
      case 'Image':
        return this.generateImage(node, indent);
      default:
        return '';
    }
  }

  private generateHero(node: AST.HeroNode, indent: number): string {
    const i = '  '.repeat(indent);
    const props = this.propsToMap(node.properties);
    const lines: string[] = [];

    lines.push(`${i}<header class="hero">`);
    lines.push(`${i}  <div class="hero-content">`);

    // Handle image
    if (props.has('image')) {
      try {
        const imageData = JSON.parse(props.get('image')!);
        let imgTag = `<img src="${this.escapeHtml(imageData.src)}"`;
        if (imageData.alt) {
          imgTag += ` alt="${this.escapeHtml(imageData.alt)}"`;
        }
        if (imageData.width) {
          imgTag += ` width="${this.escapeHtml(imageData.width)}"`;
        }
        if (imageData.height) {
          imgTag += ` height="${this.escapeHtml(imageData.height)}"`;
        }
        imgTag += ' class="hero-image">';
        lines.push(`${i}    ${imgTag}`);
      } catch (e) {
        // Ignore malformed image data
      }
    }

    if (props.has('title')) {
      lines.push(`${i}    <h1 class="hero-title">${this.escapeHtml(props.get('title')!)}</h1>`);
    }

    if (props.has('subtitle')) {
      lines.push(`${i}    <p class="hero-subtitle">${this.escapeHtml(props.get('subtitle')!)}</p>`);
    }

    // Handle button
    if (props.has('button')) {
      try {
        const buttonData = JSON.parse(props.get('button')!);
        if (buttonData.link) {
          lines.push(`${i}    <a href="${this.escapeHtml(buttonData.link)}" class="hero-button">${this.escapeHtml(buttonData.text)}</a>`);
        } else {
          lines.push(`${i}    <button class="hero-button">${this.escapeHtml(buttonData.text)}</button>`);
        }
      } catch (e) {
        // Ignore malformed button data
      }
    }

    lines.push(`${i}  </div>`);
    lines.push(`${i}</header>`);

    return lines.join('\n');
  }

  private generateSection(node: AST.SectionNode, indent: number): string {
    const i = '  '.repeat(indent);
    const lines: string[] = [];

    lines.push(`${i}<section class="section">`);
    lines.push(`${i}  <div class="section-content">`);

    if (node.title) {
      lines.push(`${i}    <h2 class="section-title">${this.escapeHtml(node.title)}</h2>`);
    }

    if (node.children.length > 0) {
      lines.push(`${i}    <div class="section-grid">`);
      node.children.forEach((child: AST.ComponentNode) => {
        lines.push(this.generateComponent(child, indent + 3));
      });
      lines.push(`${i}    </div>`);
    }

    lines.push(`${i}  </div>`);
    lines.push(`${i}</section>`);

    return lines.join('\n');
  }

  private generateCard(node: AST.CardNode, indent: number): string {
    const i = '  '.repeat(indent);
    const props = this.propsToMap(node.properties);
    const lines: string[] = [];

    lines.push(`${i}<div class="card">`);

    if (props.has('title')) {
      lines.push(`${i}  <h3 class="card-title">${this.escapeHtml(props.get('title')!)}</h3>`);
    }

    if (props.has('text')) {
      lines.push(`${i}  <p class="card-text">${this.escapeHtml(props.get('text')!)}</p>`);
    }

    lines.push(`${i}</div>`);

    return lines.join('\n');
  }

  private generateButton(node: AST.ButtonNode, indent: number): string {
    const i = '  '.repeat(indent);
    
    if (node.link) {
      return `${i}<a href="${this.escapeHtml(node.link)}" class="button">${this.escapeHtml(node.text)}</a>`;
    }
    
    return `${i}<button class="button">${this.escapeHtml(node.text)}</button>`;
  }

  private generateFooter(node: AST.FooterNode, indent: number): string {
    const i = '  '.repeat(indent);
    const props = this.propsToMap(node.properties);
    const lines: string[] = [];

    lines.push(`${i}<footer class="footer">`);
    lines.push(`${i}  <div class="footer-content">`);

    if (props.has('text')) {
      lines.push(`${i}    <p class="footer-text">${this.escapeHtml(props.get('text')!)}</p>`);
    }

    lines.push(`${i}  </div>`);
    lines.push(`${i}</footer>`);

    return lines.join('\n');
  }

  private generateImage(node: AST.ImageNode, indent: number): string {
    const i = '  '.repeat(indent);
    const src = this.escapeHtml(node.src);
    const alt = node.alt ? this.escapeHtml(node.alt) : '';
    
    const attributes: string[] = [
      `src="${src}"`,
      `alt="${alt}"`,
      'class="vela-image"'
    ];

    if (node.width) {
      attributes.push(`width="${this.escapeHtml(node.width)}"`);
    }

    if (node.height) {
      attributes.push(`height="${this.escapeHtml(node.height)}"`);
    }

    return `${i}<img ${attributes.join(' ')} />`;
  }

  private propsToMap(properties: AST.PropertyNode[]): Map<string, string> {
    const map = new Map<string, string>();
    properties.forEach((prop) => {
      map.set(prop.key, prop.value);
    });
    return map;
  }

  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
  }
}
