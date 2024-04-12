import path from 'node:path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import parser from './parsers.js';
import generateDiff from './generate-diff.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, options) => {
  const firstPathFile = path.resolve(cwd(), filepath1);
  const secondPathFile = path.resolve(cwd(), filepath2);
  const firstString = readFileSync(firstPathFile, 'utf8');
  const secondString = readFileSync(secondPathFile, 'utf8');
  const parsedFirstFile = parser(firstPathFile, firstString);
  const parsedSecondFile = parser(secondPathFile, secondString);
  const difference = generateDiff(parsedFirstFile, parsedSecondFile);
  console.log(formatter(options?.format ?? 'stylish', difference));
};

export default genDiff;
