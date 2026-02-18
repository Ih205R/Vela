/**
 * File utilities for Vela
 */

import * as fs from 'fs';
import * as path from 'path';
import { FileError } from './errors';

export class FileUtils {
  /**
   * Read file contents
   */
  static readFile(filePath: string): string {
    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      throw new FileError(`Failed to read file: ${filePath}`, filePath);
    }
  }

  /**
   * Write file contents
   */
  static writeFile(filePath: string, content: string): void {
    try {
      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(filePath, content, 'utf-8');
    } catch (error) {
      throw new FileError(`Failed to write file: ${filePath}`, filePath);
    }
  }

  /**
   * Check if file exists
   */
  static exists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  /**
   * Create directory recursively
   */
  static mkdirp(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  /**
   * Remove directory recursively
   */
  static rmdir(dirPath: string): void {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
  }

  /**
   * Copy file
   */
  static copyFile(src: string, dest: string): void {
    try {
      const dir = path.dirname(dest);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.copyFileSync(src, dest);
    } catch (error) {
      throw new FileError(`Failed to copy file from ${src} to ${dest}`);
    }
  }

  /**
   * Get file extension
   */
  static getExtension(filePath: string): string {
    return path.extname(filePath);
  }

  /**
   * Resolve path from current working directory
   */
  static resolve(...paths: string[]): string {
    return path.resolve(process.cwd(), ...paths);
  }

  /**
   * Join paths
   */
  static join(...paths: string[]): string {
    return path.join(...paths);
  }

  /**
   * Get directory name
   */
  static dirname(filePath: string): string {
    return path.dirname(filePath);
  }

  /**
   * Get base name
   */
  static basename(filePath: string, ext?: string): string {
    return path.basename(filePath, ext);
  }

  /**
   * Copy directory recursively
   */
  static copyDir(src: string, dest: string): void {
    try {
      // Create destination directory
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      // Read source directory
      const entries = fs.readdirSync(src, { withFileTypes: true });

      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          // Recursively copy subdirectories
          this.copyDir(srcPath, destPath);
        } else {
          // Copy files
          fs.copyFileSync(srcPath, destPath);
        }
      }
    } catch (error) {
      throw new FileError(`Failed to copy directory from ${src} to ${dest}`);
    }
  }
}
