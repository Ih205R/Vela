/**
 * Build command - Compiles Vela source to HTML/CSS/JS
 */

import * as path from 'path';
import { Compiler } from '../../compiler/compiler';
import { Logger } from '../../utils/logger';
import { FileUtils } from '../../utils/file-utils';

interface VelaConfig {
  src: string;
  dist: string;
  entry: string;
}

export async function build(): Promise<void> {
  try {
    Logger.title('🔨 Building Vela project...');

    // Load configuration
    const configPath = FileUtils.resolve('vela.config.json');
    let config: VelaConfig = {
      src: 'src',
      dist: 'dist',
      entry: 'main.vela',
    };

    if (FileUtils.exists(configPath)) {
      const configContent = FileUtils.readFile(configPath);
      config = { ...config, ...JSON.parse(configContent) };
      Logger.info('Loaded vela.config.json');
    } else {
      Logger.warn('No vela.config.json found, using defaults');
    }

    // Resolve paths
    const srcPath = FileUtils.resolve(config.src, config.entry);
    const distPath = FileUtils.resolve(config.dist);

    // Check if source file exists
    if (!FileUtils.exists(srcPath)) {
      Logger.error(`Source file not found: ${srcPath}`);
      process.exit(1);
    }

    Logger.info(`Reading ${config.src}/${config.entry}...`);
    const source = FileUtils.readFile(srcPath);

    // Compile
    Logger.info('Compiling...');
    const compiler = new Compiler();
    const result = compiler.compile(source);

    // Create dist directory
    FileUtils.mkdirp(distPath);

    // Write output files
    Logger.info('Writing output files...');
    
    FileUtils.writeFile(
      FileUtils.join(distPath, 'index.html'),
      result.html
    );
    Logger.success('Generated index.html');

    FileUtils.writeFile(
      FileUtils.join(distPath, 'styles.css'),
      result.css
    );
    Logger.success('Generated styles.css');

    FileUtils.writeFile(
      FileUtils.join(distPath, 'app.js'),
      result.js
    );
    Logger.success('Generated app.js');

    // Copy assets directory if it exists
    const assetsPath = FileUtils.resolve(config.src, 'assets');
    if (FileUtils.exists(assetsPath)) {
      const destAssetsPath = FileUtils.join(distPath, 'assets');
      FileUtils.copyDir(assetsPath, destAssetsPath);
      Logger.success('Copied assets directory');
    }

    Logger.blank();
    Logger.success('✨ Build completed successfully!');
    Logger.info(`Output directory: ${config.dist}/`);
    Logger.blank();
  } catch (error) {
    Logger.error(`Build failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
}
