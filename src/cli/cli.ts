#!/usr/bin/env node

/**
 * Vela CLI - Command-line interface for Vela language
 */

import { Command } from 'commander';
import { init } from './commands/init';
import { build } from './commands/build';
import { dev } from './commands/dev';
import { Logger } from '../utils/logger';

const program = new Command();

program
  .name('vela')
  .description('Vela - Modern Website Builder DSL')
  .version('1.0.0');

// Init command
program
  .command('init <project-name>')
  .description('Create a new Vela project')
  .action(async (projectName: string) => {
    await init(projectName);
  });

// Build command
program
  .command('build')
  .description('Build the Vela project')
  .action(async () => {
    await build();
  });

// Dev command
program
  .command('dev')
  .description('Start development server with file watching')
  .option('-p, --port <port>', 'Port number for dev server', '3000')
  .action(async (options) => {
    const port = parseInt(options.port, 10);
    await dev(port);
  });

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
