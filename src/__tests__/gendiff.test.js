import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { expect, test } from '@jest/globals';
import { readFileSync } from 'node:fs';
import {
  dif1File,
  dif2File,
  emptyFile,
  difValue,
  nestedStructure,
  sameNestedFile,
} from '../__fixtures__/correct-stylish-output.js';
import {
  plainSameNestedFile,
  plainNestedStructure,
  plainDif1File,
  plainDif2File,
  plainEmptyFile,
  plainDifValue,
} from '../__fixtures__/correct-plain-output.js';
import genDiff from '../make-diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (format, filename) => join(__dirname, '..', '__fixtures__', format, `${filename}.${format}`);

const testTable = [['json', 'stylish'], ['json', 'plain'], ['json', 'json'], ['yml', 'stylish'], ['yml', 'plain'], ['yml', 'json']];

test.each(testTable)('check differences for %s: same nested files (%s)', (format, style) => {
  const sameNestedfile1 = getFixturePath(format, 'samenestedfile1');
  const sameNestedfile2 = getFixturePath(format, 'samenestedfile2');
  const result = genDiff(sameNestedfile1, sameNestedfile2, style);
  switch (style) {
    case 'stylish':
      expect(result).toEqual(sameNestedFile);
      break;
    case 'plain':
      expect(result).toEqual(plainSameNestedFile);
      break;
    case 'json':
      expect(result).toEqual(readFileSync('./src/__fixtures__/json_output/json_nestedfiles.json', 'utf8'));
      break;
    default:
      break;
  }
});

test.each(testTable)('check differences for %s: different files, key has in first file (%s)', (format, style) => {
  const difString1file1 = getFixturePath(format, 'dif1file1');
  const difString1file2 = getFixturePath(format, 'dif1file2');
  const result = genDiff(difString1file1, difString1file2, style);
  switch (style) {
    case 'stylish':
      expect(result).toEqual(dif1File);
      break;
    case 'plain':
      expect(result).toEqual(plainDif1File);
      break;
    case 'json':
      expect(result).toEqual(readFileSync('./src/__fixtures__/json_output/json_dif1file.json', 'utf8'));
      break;
    default:
      break;
  }
});

test.each(testTable)('check differences for %s: different files, keys has in second file (%s)', (format, style) => {
  const difString2file1 = getFixturePath(format, 'dif2file1');
  const difString2file2 = getFixturePath(format, 'dif2file2');
  const result = genDiff(difString2file1, difString2file2, style);
  switch (style) {
    case 'stylish':
      expect(result).toEqual(dif2File);
      break;
    case 'plain':
      expect(result).toEqual(plainDif2File);
      break;
    case 'json':
      expect(result).toEqual(readFileSync('./src/__fixtures__/json_output/json_dif2file.json', 'utf8'));
      break;
    default:
      break;
  }
});

test.each(testTable)('check differences for %s: empty files (%s)', (format, style) => {
  const emptyFile1 = getFixturePath(format, 'emptyfile1');
  const emptyFile2 = getFixturePath(format, 'emptyfile2');
  const result = genDiff(emptyFile1, emptyFile2, style);
  switch (style) {
    case 'stylish':
      expect(result).toEqual(emptyFile);
      break;
    case 'plain':
      expect(result).toEqual(plainEmptyFile);
      break;
    case 'json':
      expect(result).toEqual(readFileSync('./src/__fixtures__/json_output/json_emptyfiles.json', 'utf8'));
      break;
    default:
      break;
  }
});

test.each(testTable)('check differences for %s: same files, different values (%s)', (format, style) => {
  const difValue1 = getFixturePath(format, 'difvalue1');
  const difValue2 = getFixturePath(format, 'difvalue2');
  const result = genDiff(difValue1, difValue2, style);
  switch (style) {
    case 'stylish':
      expect(result).toEqual(difValue);
      break;
    case 'plain':
      expect(result).toEqual(plainDifValue);
      break;
    case 'json':
      expect(result).toEqual(readFileSync('./src/__fixtures__/json_output/json_difvalue.json', 'utf8'));
      break;
    default:
      break;
  }
});

test.each(testTable)('check differences for %s: different files, different values (%s)', (format, style) => {
  const difFile1 = getFixturePath(format, 'file1');
  const difFile2 = getFixturePath(format, 'file2');
  const result = genDiff(difFile1, difFile2, style);
  switch (style) {
    case 'stylish':
      expect(result).toEqual(nestedStructure);
      break;
    case 'plain':
      expect(result).toEqual(plainNestedStructure);
      break;
    case 'json':
      expect(result).toEqual(readFileSync('./src/__fixtures__/json_output/json_diffile.json', 'utf8'));
      break;
    default:
      break;
  }
});
