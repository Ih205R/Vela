/**
 * Logger utility for Vela CLI
 */

export class Logger {
  static info(message: string): void {
    console.log(`\x1b[36mℹ\x1b[0m ${message}`);
  }

  static success(message: string): void {
    console.log(`\x1b[32m✓\x1b[0m ${message}`);
  }

  static error(message: string): void {
    console.error(`\x1b[31m✗\x1b[0m ${message}`);
  }

  static warn(message: string): void {
    console.warn(`\x1b[33m⚠\x1b[0m ${message}`);
  }

  static debug(message: string): void {
    if (process.env.DEBUG === 'true') {
      console.log(`\x1b[35m[DEBUG]\x1b[0m ${message}`);
    }
  }

  static title(message: string): void {
    console.log(`\n\x1b[1m${message}\x1b[0m`);
  }

  static blank(): void {
    console.log();
  }
}
