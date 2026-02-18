/**
 * Init command - Creates a new Vela project
 */

import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '../../utils/logger';
import { FileUtils } from '../../utils/file-utils';

export async function init(projectName: string): Promise<void> {
  try {
    Logger.title(`🚀 Creating new Vela project: ${projectName}`);

    const projectPath = FileUtils.resolve(projectName);

    // Check if directory already exists
    if (FileUtils.exists(projectPath)) {
      Logger.error(`Directory ${projectName} already exists`);
      process.exit(1);
    }

    // Create project structure
    Logger.info('Creating project structure...');
    FileUtils.mkdirp(projectPath);
    FileUtils.mkdirp(FileUtils.join(projectPath, 'src'));
    FileUtils.mkdirp(FileUtils.join(projectPath, 'dist'));

    // Create main.vela
    const mainVelaContent = `site "${projectName}" {

  theme {
    primary "#6C5CE7"
    background "#0B1020"
    text "#EAF0FF"
  }

  page "/" {

    hero {
      title "Welcome to ${projectName}"
      subtitle "Built with Vela - Modern Website Builder DSL"
      button "Get Started" -> "#features"
    }

    section "Features" {

      card {
        title "⚡ Fast"
        text "Lightning-fast compilation to production-ready code"
      }

      card {
        title "🎨 Beautiful"
        text "Modern, responsive design out of the box"
      }

      card {
        title "📝 Simple"
        text "Clean, readable syntax that's easy to learn"
      }

    }

    footer {
      text "© 2026 ${projectName}. Built with Vela."
    }

  }

}
`;

    FileUtils.writeFile(
      FileUtils.join(projectPath, 'src', 'main.vela'),
      mainVelaContent
    );
    Logger.success('Created src/main.vela');

    // Create vela.config.json
    const config = {
      src: 'src',
      dist: 'dist',
      entry: 'main.vela',
    };

    FileUtils.writeFile(
      FileUtils.join(projectPath, 'vela.config.json'),
      JSON.stringify(config, null, 2)
    );
    Logger.success('Created vela.config.json');

    // Create README.md
    const readmeContent = `# ${projectName}

A website built with [Vela](https://github.com/vela-lang/vela) - Modern Website Builder DSL.

## Getting Started

### Build the site

\`\`\`bash
vela build
\`\`\`

### Start development server

\`\`\`bash
vela dev
\`\`\`

## Project Structure

\`\`\`
${projectName}/
├── src/
│   └── main.vela       # Main Vela source file
├── dist/               # Compiled output
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── vela.config.json    # Vela configuration
\`\`\`

## Learn More

- [Vela Documentation](https://vela-lang.dev/docs)
- [Vela Examples](https://vela-lang.dev/examples)
`;

    FileUtils.writeFile(
      FileUtils.join(projectPath, 'README.md'),
      readmeContent
    );
    Logger.success('Created README.md');

    // Create .gitignore
    const gitignoreContent = `node_modules/
dist/
*.log
.DS_Store
`;

    FileUtils.writeFile(
      FileUtils.join(projectPath, '.gitignore'),
      gitignoreContent
    );
    Logger.success('Created .gitignore');

    Logger.blank();
    Logger.success(`✨ Project ${projectName} created successfully!`);
    Logger.blank();
    Logger.info('Next steps:');
    Logger.info(`  cd ${projectName}`);
    Logger.info('  vela build');
    Logger.info('  vela dev');
    Logger.blank();
  } catch (error) {
    Logger.error(`Failed to create project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
}
