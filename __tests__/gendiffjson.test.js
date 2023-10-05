import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { expect, test, jest } from '@jest/globals';
import {
  sameFile,
  dif1File,
  dif2File,
  emptyFile,
  defaultFile,
  difValue,
  nestedStructure,
  sameNestedFile,
} from '../__fixtures__/correct-output.js';
import genDiff from '../make-diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', 'json', filename);

test('check differences: other files', () => {
  const defaultfile1 = getFixturePath('filepath1.json');
  const defaultfile2 = getFixturePath('filepath2.json');
  console.log = jest.fn();
  genDiff(defaultfile1, defaultfile2);
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[defaultFile]]);
});

test('check differences: same files', () => {
  const samefile1 = getFixturePath('samefile1.json');
  const samefile2 = getFixturePath('samefile2.json');
  console.log = jest.fn();
  genDiff(samefile1, samefile2);
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[sameFile]]);
});

test('check differences: same nested files', () => {
  const sameNestedfile1 = getFixturePath('samenestedfile1.json');
  const sameNestedfile2 = getFixturePath('samenestedfile2.json');
  console.log = jest.fn();
  genDiff(sameNestedfile1, sameNestedfile2);
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[sameNestedFile]]);
});

test('check differences: different files, key has in first file', () => {
  const difString1file1 = getFixturePath('dif1file1.json');
  const difString1file2 = getFixturePath('dif1file2.json');
  console.log = jest.fn();
  genDiff(difString1file1, difString1file2);
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[dif1File]]);
});

test('check differences: different files, keys has in second file', () => {
  const difString2file1 = getFixturePath('dif2file1.json');
  const difString2file2 = getFixturePath('dif2file2.json');
  console.log = jest.fn();
  genDiff(difString2file1, difString2file2);
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[dif2File]]);
});

test('check differences: empty files', () => {
  const emptyFile1 = getFixturePath('emptyfile1.json');
  const emptyFile2 = getFixturePath('emptyfile2.json');
  console.log = jest.fn();
  genDiff(emptyFile1, emptyFile2);
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[emptyFile]]);
});

test('check differences: same files, different values', () => {
  const difValue1 = getFixturePath('difvalue1.json');
  const difValue2 = getFixturePath('difvalue2.json');
  console.log = jest.fn();
  genDiff(difValue1, difValue2);
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[difValue]]);
});

test('check differences: different files, different values', () => {
  const difFile1 = getFixturePath('file1.json');
  const difFile2 = getFixturePath('file2.json');
  console.log = jest.fn();
  genDiff(difFile1, difFile2);
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[nestedStructure]]);
});
