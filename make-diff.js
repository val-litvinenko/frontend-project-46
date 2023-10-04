import path from 'node:path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import _ from 'lodash';
import parser from './parsers.js';

const generateString = (key, value) => `${key}: ${value}`;
const generateOutput = (symbol, str) => `
  ${symbol} ${str}`;

const generateDiffString = (file1, file2) => {
  const firstJsonKeys = Object.keys(file1);
  const secondJsonKeys = Object.keys(file2);

  let diff = [];

  firstJsonKeys.forEach((key) => {
    if (Object.hasOwn(file2, key)) {
      if (file1[key] !== file2[key]) {
        diff.push([generateString(key, file1[key]), '-']);
        diff.push([generateString(key, file2[key]), '+']);
      }
      if (file1[key] === file2[key]) {
        diff.push([generateString(key, file1[key]), ' ']);
      }
    } else {
      diff.push([generateString(key, file1[key]), '-']);
    }
  });
  const filteredKeys = secondJsonKeys.filter((key) => (!firstJsonKeys
    .includes(key)));

  filteredKeys.forEach((key) => {
    diff.push([generateString(key, file2[key]), '+']);
  });
  diff = _.sortBy(diff);
  const output = diff.map(([str, symbol]) => generateOutput(symbol, str));
  return console.log(`{${output}
}`);
};

const genDiff = (filepath1, filepath2) => {
  const firstPathFile = path.resolve(cwd(), filepath1);
  const secondPathFile = path.resolve(cwd(), filepath2);
  const firstString = readFileSync(firstPathFile, 'utf8');
  const secondString = readFileSync(secondPathFile, 'utf8');
  const parsedFirstFile = parser(firstPathFile, firstString);
  const parsedSecondFile = parser(secondPathFile, secondString);
  generateDiffString(parsedFirstFile, parsedSecondFile);
};

export default genDiff;
