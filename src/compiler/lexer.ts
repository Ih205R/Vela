/**
 * Lexer for Vela Language
 * Tokenizes input source code
 */

export enum TokenType {
  // Literals
  STRING = 'STRING',
  IDENTIFIER = 'IDENTIFIER',
  
  // Symbols
  LEFT_BRACE = 'LEFT_BRACE',
  RIGHT_BRACE = 'RIGHT_BRACE',
  ARROW = 'ARROW',
  
  // Keywords
  SITE = 'SITE',
  THEME = 'THEME',
  PAGE = 'PAGE',
  HERO = 'HERO',
  SECTION = 'SECTION',
  CARD = 'CARD',
  BUTTON = 'BUTTON',
  FOOTER = 'FOOTER',
  IMAGE = 'IMAGE',
  TITLE = 'TITLE',
  SUBTITLE = 'SUBTITLE',
  TEXT = 'TEXT',
  PRIMARY = 'PRIMARY',
  BACKGROUND = 'BACKGROUND',
  SRC = 'SRC',
  ALT = 'ALT',
  WIDTH = 'WIDTH',
  HEIGHT = 'HEIGHT',
  
  // Special
  EOF = 'EOF',
  NEWLINE = 'NEWLINE',
}

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}

const KEYWORDS: Record<string, TokenType> = {
  site: TokenType.SITE,
  theme: TokenType.THEME,
  page: TokenType.PAGE,
  hero: TokenType.HERO,
  section: TokenType.SECTION,
  card: TokenType.CARD,
  button: TokenType.BUTTON,
  footer: TokenType.FOOTER,
  image: TokenType.IMAGE,
  title: TokenType.TITLE,
  subtitle: TokenType.SUBTITLE,
  text: TokenType.TEXT,
  primary: TokenType.PRIMARY,
  background: TokenType.BACKGROUND,
  src: TokenType.SRC,
  alt: TokenType.ALT,
  width: TokenType.WIDTH,
  height: TokenType.HEIGHT,
};

export class Lexer {
  private source: string;
  private position: number = 0;
  private line: number = 1;
  private column: number = 1;

  constructor(source: string) {
    this.source = source;
  }

  tokenize(): Token[] {
    const tokens: Token[] = [];

    while (!this.isAtEnd()) {
      this.skipWhitespace();
      if (this.isAtEnd()) break;

      const token = this.nextToken();
      if (token) {
        tokens.push(token);
      }
    }

    tokens.push({
      type: TokenType.EOF,
      value: '',
      line: this.line,
      column: this.column,
    });

    return tokens;
  }

  private nextToken(): Token | null {
    const char = this.peek();

    // Skip comments
    if (char === '/' && this.peekNext() === '/') {
      this.skipLineComment();
      return null;
    }

    if (char === '/' && this.peekNext() === '*') {
      this.skipBlockComment();
      return null;
    }

    // String literals
    if (char === '"') {
      return this.readString();
    }

    // Symbols
    if (char === '{') {
      return this.makeToken(TokenType.LEFT_BRACE, this.advance());
    }

    if (char === '}') {
      return this.makeToken(TokenType.RIGHT_BRACE, this.advance());
    }

    if (char === '-' && this.peekNext() === '>') {
      this.advance();
      this.advance();
      return this.makeToken(TokenType.ARROW, '->');
    }

    // Identifiers and keywords
    if (this.isAlpha(char)) {
      return this.readIdentifier();
    }

    throw new Error(
      `Unexpected character '${char}' at line ${this.line}, column ${this.column}`
    );
  }

  private readString(): Token {
    const startLine = this.line;
    const startColumn = this.column;
    
    this.advance(); // consume opening "
    let value = '';

    while (!this.isAtEnd() && this.peek() !== '"') {
      if (this.peek() === '\n') {
        this.line++;
        this.column = 0;
      }
      value += this.advance();
    }

    if (this.isAtEnd()) {
      throw new Error(`Unterminated string at line ${startLine}, column ${startColumn}`);
    }

    this.advance(); // consume closing "

    return {
      type: TokenType.STRING,
      value,
      line: startLine,
      column: startColumn,
    };
  }

  private readIdentifier(): Token {
    const startLine = this.line;
    const startColumn = this.column;
    let value = '';

    while (!this.isAtEnd() && (this.isAlphaNumeric(this.peek()) || this.peek() === '_')) {
      value += this.advance();
    }

    const type = KEYWORDS[value.toLowerCase()] || TokenType.IDENTIFIER;

    return {
      type,
      value,
      line: startLine,
      column: startColumn,
    };
  }

  private skipWhitespace(): void {
    while (!this.isAtEnd()) {
      const char = this.peek();
      if (char === ' ' || char === '\t' || char === '\r' || char === '\n') {
        if (char === '\n') {
          this.line++;
          this.column = 0;
        }
        this.advance();
      } else {
        break;
      }
    }
  }

  private skipLineComment(): void {
    while (!this.isAtEnd() && this.peek() !== '\n') {
      this.advance();
    }
  }

  private skipBlockComment(): void {
    this.advance(); // /
    this.advance(); // *

    while (!this.isAtEnd()) {
      if (this.peek() === '*' && this.peekNext() === '/') {
        this.advance();
        this.advance();
        break;
      }
      if (this.peek() === '\n') {
        this.line++;
        this.column = 0;
      }
      this.advance();
    }
  }

  private makeToken(type: TokenType, value: string): Token {
    return {
      type,
      value,
      line: this.line,
      column: this.column - value.length,
    };
  }

  private peek(): string {
    if (this.isAtEnd()) return '\0';
    return this.source[this.position];
  }

  private peekNext(): string {
    if (this.position + 1 >= this.source.length) return '\0';
    return this.source[this.position + 1];
  }

  private advance(): string {
    const char = this.source[this.position];
    this.position++;
    this.column++;
    return char;
  }

  private isAtEnd(): boolean {
    return this.position >= this.source.length;
  }

  private isAlpha(char: string): boolean {
    return /[a-zA-Z]/.test(char);
  }

  private isAlphaNumeric(char: string): boolean {
    return /[a-zA-Z0-9]/.test(char);
  }
}
