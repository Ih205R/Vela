/**
 * Main Compiler for Vela Language
 * Orchestrates parsing and code generation
 */

import { Parser } from './parser';
import { HTMLGenerator } from '../generator/html-generator';
import { CSSGenerator } from '../generator/css-generator';
import { JSGenerator } from '../generator/js-generator';
import { CompilerError } from '../utils/errors';
import * as AST from './ast';

export interface CompileResult {
  html: string;
  css: string;
  js: string;
  ast: AST.SiteNode;
}

export class Compiler {
  compile(source: string): CompileResult {
    try {
      // Parse source into AST
      const parser = new Parser(source);
      const ast = parser.parse();

      // Validate AST
      this.validateAST(ast);

      // Generate output files
      const htmlGenerator = new HTMLGenerator();
      const cssGenerator = new CSSGenerator();
      const jsGenerator = new JSGenerator();

      const html = htmlGenerator.generate(ast);
      const css = cssGenerator.generate(ast);
      const js = jsGenerator.generate(ast);

      return { html, css, js, ast };
    } catch (error) {
      if (error instanceof Error) {
        throw new CompilerError(error.message);
      }
      throw new CompilerError('Unknown compilation error');
    }
  }

  private validateAST(ast: AST.SiteNode): void {
    // Validate site has a name
    if (!ast.name || ast.name.trim().length === 0) {
      throw new CompilerError('Site must have a name');
    }

    // Validate at least one page exists
    if (ast.pages.length === 0) {
      throw new CompilerError('Site must have at least one page');
    }

    // Validate each page
    ast.pages.forEach((page, index) => {
      if (!page.route || page.route.trim().length === 0) {
        throw new CompilerError(`Page ${index + 1} must have a route`);
      }

      if (!page.route.startsWith('/')) {
        throw new CompilerError(`Page route must start with '/': ${page.route}`);
      }
    });

    // Validate theme colors if present
    if (ast.theme) {
      ast.theme.properties.forEach((prop: AST.ThemeProperty) => {
        if (prop.key === 'primary' || prop.key === 'background' || prop.key === 'text') {
          if (!this.isValidColor(prop.value)) {
            throw new CompilerError(`Invalid color value for ${prop.key}: ${prop.value}`);
          }
        }
      });
    }
  }

  private isValidColor(color: string): boolean {
    // Simple validation for hex colors
    return /^#[0-9A-Fa-f]{6}$/.test(color) || /^#[0-9A-Fa-f]{3}$/.test(color);
  }
}
