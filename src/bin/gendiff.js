#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../make-diff.js';

const program = new Command();

program
  .version('1.0.0', '-v, --VERSION', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format));
  });

program.parse(process.argv);
