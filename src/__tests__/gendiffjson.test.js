import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { expect, test } from '@jest/globals';
import { readFileSync } from 'node:fs';
import {
  sameFile,
  dif1File,
  dif2File,
  emptyFile,
  defaultFile,
  difValue,
  nestedStructure,
  sameNestedFile,
} from '../__fixtures__/correct-stylish-output.js';
import {
  plainDefaultFile,
  plainSameFile,
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

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', 'json', filename);

test('check differences: other files (stylish)', () => {
  const defaultfile1 = getFixturePath('filepath1.json');
  const defaultfile2 = getFixturePath('filepath2.json');
  const result = genDiff(defaultfile1, defaultfile2, 'stylish');
  expect(result).toEqual(defaultFile);
});

test('check differences: other files (plain)', () => {
  const defaultfile1 = getFixturePath('filepath1.json');
  const defaultfile2 = getFixturePath('filepath2.json');
  const result = genDiff(defaultfile1, defaultfile2, 'plain');
  expect(result).toEqual(plainDefaultFile);
});

test('check differences: other files (json)', () => {
  const defaultfile1 = getFixturePath('filepath1.json');
  const defaultfile2 = getFixturePath('filepath2.json');
  const result = genDiff(defaultfile1, defaultfile2, 'json');
  const jsonOtherFile = readFileSync('./src/__fixtures__/json_output/json_otherfiles.json', 'utf8');
  expect(result).toEqual(jsonOtherFile);
});

test('check differences: same files (stylish)', () => {
  const samefile1 = getFixturePath('samefile1.json');
  const samefile2 = getFixturePath('samefile2.json');
  const result = genDiff(samefile1, samefile2, 'stylish');
  expect(result).toEqual(sameFile);
});

test('check differences: same files (plain)', () => {
  const samefile1 = getFixturePath('samefile1.json');
  const samefile2 = getFixturePath('samefile2.json');
  const result = genDiff(samefile1, samefile2, 'plain');
  expect(result).toEqual(plainSameFile);
});

test('check differences: same files (json)', () => {
  const samefile1 = getFixturePath('samefile1.json');
  const samefile2 = getFixturePath('samefile2.json');
  const result = genDiff(samefile1, samefile2, 'json');
  const jsonSameFiles = readFileSync('./src/__fixtures__/json_output/json_samefiles.json', 'utf8');
  expect(result).toEqual(jsonSameFiles);
});

test('check differences: same nested files (stylish)', () => {
  const sameNestedfile1 = getFixturePath('samenestedfile1.json');
  const sameNestedfile2 = getFixturePath('samenestedfile2.json');
  const result = genDiff(sameNestedfile1, sameNestedfile2, 'stylish');
  expect(result).toEqual(sameNestedFile);
});

test('check differences: same nested files (plain)', () => {
  const sameNestedfile1 = getFixturePath('samenestedfile1.json');
  const sameNestedfile2 = getFixturePath('samenestedfile2.json');
  const result = genDiff(sameNestedfile1, sameNestedfile2, 'plain');
  expect(result).toEqual(plainSameNestedFile);
});

test('check differences: same nested files (json)', () => {
  const sameNestedfile1 = getFixturePath('samenestedfile1.json');
  const sameNestedfile2 = getFixturePath('samenestedfile2.json');
  const result = genDiff(sameNestedfile1, sameNestedfile2, 'json');
  const jsonNestedFiles = readFileSync('./src/__fixtures__/json_output/json_nestedfiles.json', 'utf8');
  expect(result).toEqual(jsonNestedFiles);
});

test('check differences: different files, key has in first file (stylish)', () => {
  const difString1file1 = getFixturePath('dif1file1.json');
  const difString1file2 = getFixturePath('dif1file2.json');
  const result = genDiff(difString1file1, difString1file2, 'stylish');
  expect(result).toEqual(dif1File);
});

test('check differences: different files, key has in first file (plain)', () => {
  const difString1file1 = getFixturePath('dif1file1.json');
  const difString1file2 = getFixturePath('dif1file2.json');
  const result = genDiff(difString1file1, difString1file2, 'plain');
  expect(result).toEqual(plainDif1File);
});

test('check differences: different files, key has in first file (json)', () => {
  const difString1file1 = getFixturePath('dif1file1.json');
  const difString1file2 = getFixturePath('dif1file2.json');
  const result = genDiff(difString1file1, difString1file2, 'json');
  const jsonDif1File = readFileSync('./src/__fixtures__/json_output/json_dif1file.json', 'utf8');
  expect(result).toEqual(jsonDif1File);
});

test('check differences: different files, keys has in second file (stylish)', () => {
  const difString2file1 = getFixturePath('dif2file1.json');
  const difString2file2 = getFixturePath('dif2file2.json');
  const result = genDiff(difString2file1, difString2file2, 'stylish');
  expect(result).toEqual(dif2File);
});

test('check differences: different files, keys has in second file (plain))', () => {
  const difString2file1 = getFixturePath('dif2file1.json');
  const difString2file2 = getFixturePath('dif2file2.json');
  const result = genDiff(difString2file1, difString2file2, 'plain');
  expect(result).toEqual(plainDif2File);
});

test('check differences: different files, keys has in second file (json)', () => {
  const difString2file1 = getFixturePath('dif2file1.json');
  const difString2file2 = getFixturePath('dif2file2.json');
  const result = genDiff(difString2file1, difString2file2, 'json');
  const jsonDif2File = readFileSync('./src/__fixtures__/json_output/json_dif2file.json', 'utf8');
  expect(result).toEqual(jsonDif2File);
});

test('check differences: empty files (stylish)', () => {
  const emptyFile1 = getFixturePath('emptyfile1.json');
  const emptyFile2 = getFixturePath('emptyfile2.json');
  const result = genDiff(emptyFile1, emptyFile2, 'stylish');
  expect(result).toEqual(emptyFile);
});

test('check differences: empty files (plain)', () => {
  const emptyFile1 = getFixturePath('emptyfile1.json');
  const emptyFile2 = getFixturePath('emptyfile2.json');
  const result = genDiff(emptyFile1, emptyFile2, 'plain');
  expect(result).toEqual(plainEmptyFile);
});

test('check differences: empty files (json)', () => {
  const emptyFile1 = getFixturePath('emptyfile1.json');
  const emptyFile2 = getFixturePath('emptyfile2.json');
  const result = genDiff(emptyFile1, emptyFile2, 'json');
  const jsonEmptyFile = readFileSync('./src/__fixtures__/json_output/json_emptyfiles.json', 'utf8');
  expect(result).toEqual(jsonEmptyFile);
});

test('check differences: same files, different values (stylish)', () => {
  const difValue1 = getFixturePath('difvalue1.json');
  const difValue2 = getFixturePath('difvalue2.json');
  const result = genDiff(difValue1, difValue2, 'stylish');
  expect(result).toEqual(difValue);
});

test('check differences: same files, different values (plain)', () => {
  const difValue1 = getFixturePath('difvalue1.json');
  const difValue2 = getFixturePath('difvalue2.json');
  const result = genDiff(difValue1, difValue2, 'plain');
  expect(result).toEqual(plainDifValue);
});

test('check differences: same files, different values (json)', () => {
  const difValue1 = getFixturePath('difvalue1.json');
  const difValue2 = getFixturePath('difvalue2.json');
  const result = genDiff(difValue1, difValue2, 'json');
  const jsonDifValue = readFileSync('./src/__fixtures__/json_output/json_difvalue.json', 'utf8');
  expect(result).toEqual(jsonDifValue);
});

test('check differences: different files, different values (stylish)', () => {
  const difFile1 = getFixturePath('file1.json');
  const difFile2 = getFixturePath('file2.json');
  const result = genDiff(difFile1, difFile2, 'stylish');
  expect(result).toEqual(nestedStructure);
});

test('check differences: different files, different values (plain)', () => {
  const difFile1 = getFixturePath('file1.json');
  const difFile2 = getFixturePath('file2.json');
  const result = genDiff(difFile1, difFile2, 'plain');
  expect(result).toEqual(plainNestedStructure);
});

test('check differences: different files, different values (json)', () => {
  const difFile1 = getFixturePath('file1.json');
  const difFile2 = getFixturePath('file2.json');
  const result = genDiff(difFile1, difFile2, 'json');
  const jsonDifFiles = readFileSync('./src/__fixtures__/json_output/json_diffile.json', 'utf8');
  expect(result).toEqual(jsonDifFiles);
});
