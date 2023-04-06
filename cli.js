#!/usr/bin/env node

const readJSFiles = require('./index');
const minimist = require('minimist');
const fs = require('fs');

const options = minimist(process.argv.slice(2), {
  alias: {
    c: 'config',
  },
  default: {
    config: '',
  },
});

if (options._.length !== 2) {
  console.error('Usage: repo-loader <repository_path> <output_file_path> [-c /path/to/config.json]');
  process.exit(1);
}

const [repoPath, outputPath] = options._;
const configPath = options.config;

let config = {
  include: ['**/*.js'],
  exclude: ['node_modules/**'],
};

if (configPath) {
  try {
    const configFileContent = fs.readFileSync(configPath, 'utf8');
    const configFileConfig = JSON.parse(configFileContent);
    config = {
      ...config,
      ...configFileConfig,
      exclude: [...config.exclude, ...(configFileConfig.exclude || [])],
    };
  } catch (error) {
    console.error('Error reading or parsing the config file:', error.message);
    process.exit(1);
  }
}

readJSFiles(repoPath, outputPath, config);
