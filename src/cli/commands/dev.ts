/**
 * Dev command - Starts development server with file watching
 */

import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { watch } from 'chokidar';
import { build } from './build';
import { Logger } from '../../utils/logger';
import { FileUtils } from '../../utils/file-utils';

interface VelaConfig {
  src: string;
  dist: string;
  entry: string;
}

export async function dev(port: number = 3000): Promise<void> {
  try {
    Logger.title('🚀 Starting Vela development server...');

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
    }

    // Initial build
    await build();

    // Start HTTP server
    const distPath = FileUtils.resolve(config.dist);
    const server = createServer(distPath, port);

    // Watch for file changes
    const watchPath = FileUtils.resolve(config.src);
    Logger.info(`Watching for changes in ${config.src}/...`);

    const watcher = watch(watchPath, {
      persistent: true,
      ignoreInitial: true,
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'], // Ignore dist folder!
    });

    let isRebuilding = false;

    watcher.on('change', async (filePath: string) => {
      if (isRebuilding) return; // Prevent concurrent rebuilds
      
      isRebuilding = true;
      Logger.blank();
      Logger.info(`File changed: ${path.relative(process.cwd(), filePath)}`);
      try {
        await build();
        Logger.success('✨ Rebuild complete!');
      } catch (error) {
        Logger.error(`Rebuild failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        isRebuilding = false;
      }
    });

    // Handle shutdown
    process.on('SIGINT', () => {
      Logger.blank();
      Logger.info('Shutting down development server...');
      watcher.close();
      server.close();
      process.exit(0);
    });

    // Keep the process alive
    await new Promise(() => {}); // Never resolves, keeps the server running

  } catch (error) {
    Logger.error(`Failed to start dev server: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
}

function createServer(distPath: string, port: number): http.Server {
  const server = http.createServer((req, res) => {
    let filePath = path.join(distPath, req.url === '/' ? 'index.html' : req.url!);

    const extname = path.extname(filePath);
    const contentTypeMap: Record<string, string> = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
    };

    const contentType = contentTypeMap[extname] || 'text/plain';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          // File not found, try index.html
          const indexPath = path.join(distPath, 'index.html');
          fs.readFile(indexPath, (err, indexContent) => {
            if (err) {
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('404 Not Found');
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(indexContent, 'utf-8');
            }
          });
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${error.code}`);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });

  server.listen(port, () => {
    Logger.blank();
    Logger.success(`✨ Development server running!`);
    Logger.info(`   Local: http://localhost:${port}`);
    Logger.blank();
    Logger.info('Press Ctrl+C to stop');
    Logger.blank();
  });

  return server;
}
