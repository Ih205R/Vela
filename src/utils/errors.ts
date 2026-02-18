/**
 * Custom Error Classes for Vela Compiler
 */

export class VelaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VelaError';
  }
}

export class SyntaxError extends VelaError {
  line?: number;
  column?: number;

  constructor(message: string, line?: number, column?: number) {
    super(message);
    this.name = 'SyntaxError';
    this.line = line;
    this.column = column;
  }

  toString(): string {
    if (this.line !== undefined && this.column !== undefined) {
      return `${this.name} at line ${this.line}, column ${this.column}: ${this.message}`;
    }
    return `${this.name}: ${this.message}`;
  }
}

export class CompilerError extends VelaError {
  constructor(message: string) {
    super(message);
    this.name = 'CompilerError';
  }
}

export class FileError extends VelaError {
  filePath?: string;

  constructor(message: string, filePath?: string) {
    super(message);
    this.name = 'FileError';
    this.filePath = filePath;
  }

  toString(): string {
    if (this.filePath) {
      return `${this.name} (${this.filePath}): ${this.message}`;
    }
    return `${this.name}: ${this.message}`;
  }
}
