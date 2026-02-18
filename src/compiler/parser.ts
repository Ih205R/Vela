/**
 * Parser for Vela Language
 * Builds Abstract Syntax Tree from tokens
 */

import { Lexer, Token, TokenType } from './lexer';
import * as AST from './ast';

export class Parser {
  private tokens: Token[];
  private current: number = 0;

  constructor(source: string) {
    const lexer = new Lexer(source);
    this.tokens = lexer.tokenize();
  }

  parse(): AST.SiteNode {
    return this.parseSite();
  }

  private parseSite(): AST.SiteNode {
    this.expect(TokenType.SITE);
    const name = this.expectString();
    this.expect(TokenType.LEFT_BRACE);

    let theme: AST.ThemeNode | undefined;
    const pages: AST.PageNode[] = [];

    while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
      if (this.check(TokenType.THEME)) {
        theme = this.parseTheme();
      } else if (this.check(TokenType.PAGE)) {
        pages.push(this.parsePage());
      } else {
        throw this.error(`Unexpected token in site block: ${this.peek().value}`);
      }
    }

    this.expect(TokenType.RIGHT_BRACE);

    return {
      type: 'Site',
      name,
      theme,
      pages,
    };
  }

  private parseTheme(): AST.ThemeNode {
    this.expect(TokenType.THEME);
    this.expect(TokenType.LEFT_BRACE);

    const properties: AST.ThemeProperty[] = [];

    while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
      const key = this.expectIdentifier();
      const value = this.expectString();

      properties.push({
        type: 'ThemeProperty',
        key,
        value,
      });
    }

    this.expect(TokenType.RIGHT_BRACE);

    return {
      type: 'Theme',
      properties,
    };
  }

  private parsePage(): AST.PageNode {
    this.expect(TokenType.PAGE);
    const route = this.expectString();
    this.expect(TokenType.LEFT_BRACE);

    const children: AST.ComponentNode[] = [];

    while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
      children.push(this.parseComponent());
    }

    this.expect(TokenType.RIGHT_BRACE);

    return {
      type: 'Page',
      route,
      children,
    };
  }

  private parseComponent(): AST.ComponentNode {
    const token = this.peek();

    switch (token.type) {
      case TokenType.HERO:
        return this.parseHero();
      case TokenType.SECTION:
        return this.parseSection();
      case TokenType.CARD:
        return this.parseCard();
      case TokenType.BUTTON:
        return this.parseButton();
      case TokenType.FOOTER:
        return this.parseFooter();
      case TokenType.IMAGE:
        return this.parseImage();
      default:
        throw this.error(`Unknown component type: ${token.value}`);
    }
  }

  private parseHero(): AST.HeroNode {
    this.expect(TokenType.HERO);
    this.expect(TokenType.LEFT_BRACE);

    const properties: AST.PropertyNode[] = [];

    while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
      if (this.check(TokenType.BUTTON)) {
        // Parse button as a property
        const button = this.parseButton();
        properties.push({
          type: 'Property',
          key: 'button',
          value: JSON.stringify(button),
        });
      } else if (this.check(TokenType.IMAGE)) {
        // Parse image as a property
        const image = this.parseImage();
        properties.push({
          type: 'Property',
          key: 'image',
          value: JSON.stringify(image),
        });
      } else {
        const key = this.expectIdentifier();
        const value = this.expectString();
        properties.push({
          type: 'Property',
          key,
          value,
        });
      }
    }

    this.expect(TokenType.RIGHT_BRACE);

    return {
      type: 'Hero',
      properties,
    };
  }

  private parseSection(): AST.SectionNode {
    this.expect(TokenType.SECTION);
    
    let title: string | undefined;
    if (this.check(TokenType.STRING)) {
      title = this.expectString();
    }

    this.expect(TokenType.LEFT_BRACE);

    const children: AST.ComponentNode[] = [];

    while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
      children.push(this.parseComponent());
    }

    this.expect(TokenType.RIGHT_BRACE);

    return {
      type: 'Section',
      title,
      children,
    };
  }

  private parseCard(): AST.CardNode {
    this.expect(TokenType.CARD);
    this.expect(TokenType.LEFT_BRACE);

    const properties: AST.PropertyNode[] = [];

    while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
      const key = this.expectIdentifier();
      const value = this.expectString();
      properties.push({
        type: 'Property',
        key,
        value,
      });
    }

    this.expect(TokenType.RIGHT_BRACE);

    return {
      type: 'Card',
      properties,
    };
  }

  private parseButton(): AST.ButtonNode {
    this.expect(TokenType.BUTTON);
    const text = this.expectString();

    let link: string | undefined;
    if (this.check(TokenType.ARROW)) {
      this.expect(TokenType.ARROW);
      link = this.expectString();
    }

    return {
      type: 'Button',
      text,
      link,
    };
  }

  private parseFooter(): AST.FooterNode {
    this.expect(TokenType.FOOTER);
    this.expect(TokenType.LEFT_BRACE);

    const properties: AST.PropertyNode[] = [];

    while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
      const key = this.expectIdentifier();
      const value = this.expectString();
      properties.push({
        type: 'Property',
        key,
        value,
      });
    }

    this.expect(TokenType.RIGHT_BRACE);

    return {
      type: 'Footer',
      properties,
    };
  }

  private parseImage(): AST.ImageNode {
    this.expect(TokenType.IMAGE);

    let src: string = '';
    let alt: string | undefined;
    let width: string | undefined;
    let height: string | undefined;

    // Check if we have braces or direct string
    if (this.check(TokenType.LEFT_BRACE)) {
      // New syntax: image { src "..." alt "..." }
      this.expect(TokenType.LEFT_BRACE);

      while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
        const token = this.advance();
        let key: string;

        // Accept both identifiers and image-related keywords as property names
        if (token.type === TokenType.SRC) {
          key = 'src';
        } else if (token.type === TokenType.ALT) {
          key = 'alt';
        } else if (token.type === TokenType.WIDTH) {
          key = 'width';
        } else if (token.type === TokenType.HEIGHT) {
          key = 'height';
        } else if (token.type === TokenType.IDENTIFIER) {
          key = token.value;
        } else {
          throw this.error(`Expected property name but got ${token.type}`);
        }

        const value = this.expectString();

        if (key === 'src') src = value;
        if (key === 'alt') alt = value;
        if (key === 'width') width = value;
        if (key === 'height') height = value;
      }

      this.expect(TokenType.RIGHT_BRACE);
    } else {
      // Old syntax: image "path.png" { alt "..." }
      src = this.expectString();

      // Check for optional properties in braces
      if (this.check(TokenType.LEFT_BRACE)) {
        this.expect(TokenType.LEFT_BRACE);

        while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
          const key = this.expectIdentifier();
          const value = this.expectString();

          if (key === 'alt') alt = value;
          if (key === 'width') width = value;
          if (key === 'height') height = value;
        }

        this.expect(TokenType.RIGHT_BRACE);
      }
    }

    return {
      type: 'Image',
      src,
      alt,
      width,
      height,
    };
  }

  // Helper methods

  private expect(type: TokenType): Token {
    if (this.check(type)) {
      return this.advance();
    }
    throw this.error(`Expected ${type} but got ${this.peek().type}`);
  }

  private expectString(): string {
    const token = this.expect(TokenType.STRING);
    return token.value;
  }

  private expectIdentifier(): string {
    const token = this.peek();
    
    // Accept any keyword or identifier as property name
    if (
      token.type === TokenType.IDENTIFIER ||
      token.type === TokenType.TITLE ||
      token.type === TokenType.SUBTITLE ||
      token.type === TokenType.TEXT ||
      token.type === TokenType.PRIMARY ||
      token.type === TokenType.BACKGROUND
    ) {
      return this.advance().value;
    }

    throw this.error(`Expected identifier but got ${token.type}`);
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) {
      this.current++;
    }
    return this.previous();
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private error(message: string): Error {
    const token = this.peek();
    return new Error(`Parse error at line ${token.line}, column ${token.column}: ${message}`);
  }
}
