import path from 'node:path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import parser from './parsers.js';
import generateDiff from './generate-diff.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const firstPathFile = path.resolve(cwd(), filepath1);
  const secondPathFile = path.resolve(cwd(), filepath2);
  const firstString = readFileSync(firstPathFile, 'utf8');
  const secondString = readFileSync(secondPathFile, 'utf8');
  const parsedFirstFile = parser(path.extname(firstPathFile), firstString);
  const parsedSecondFile = parser(path.extname(secondPathFile), secondString);
  const difference = generateDiff(parsedFirstFile ?? {}, parsedSecondFile ?? {});
  return formatter(format, difference);
};

export default genDiff;
