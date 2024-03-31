import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { expect, test, jest } from '@jest/globals';
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
  console.log = jest.fn();
  genDiff(defaultfile1, defaultfile2, { format: 'stylish' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[defaultFile]]);
});

test('check differences: other files (plain)', () => {
  const defaultfile1 = getFixturePath('filepath1.json');
  const defaultfile2 = getFixturePath('filepath2.json');
  console.log = jest.fn();
  genDiff(defaultfile1, defaultfile2, { format: 'plain' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[plainDefaultFile]]);
});

test('check differences: other files (json)', () => {
  const defaultfile1 = getFixturePath('filepath1.json');
  const defaultfile2 = getFixturePath('filepath2.json');
  console.log = jest.fn();
  genDiff(defaultfile1, defaultfile2, { format: 'json' });
  const jsonOtherFile = readFileSync('./__fixtures__/json_output/json_otherfiles.json', 'utf8');
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[jsonOtherFile]]);
});

test('check differences: same files (stylish)', () => {
  const samefile1 = getFixturePath('samefile1.json');
  const samefile2 = getFixturePath('samefile2.json');
  console.log = jest.fn();
  genDiff(samefile1, samefile2, { format: 'stylish' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[sameFile]]);
});

test('check differences: same files (plain)', () => {
  const samefile1 = getFixturePath('samefile1.json');
  const samefile2 = getFixturePath('samefile2.json');
  console.log = jest.fn();
  genDiff(samefile1, samefile2, { format: 'plain' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[plainSameFile]]);
});

test('check differences: same files (json)', () => {
  const samefile1 = getFixturePath('samefile1.json');
  const samefile2 = getFixturePath('samefile2.json');
  console.log = jest.fn();
  genDiff(samefile1, samefile2, { format: 'json' });
  const jsonSameFiles = readFileSync('./__fixtures__/json_output/json_samefiles.json', 'utf8');
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[jsonSameFiles]]);
});

test('check differences: same nested files (stylish)', () => {
  const sameNestedfile1 = getFixturePath('samenestedfile1.json');
  const sameNestedfile2 = getFixturePath('samenestedfile2.json');
  console.log = jest.fn();
  genDiff(sameNestedfile1, sameNestedfile2, { format: 'stylish' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[sameNestedFile]]);
});

test('check differences: same nested files (plain)', () => {
  const sameNestedfile1 = getFixturePath('samenestedfile1.json');
  const sameNestedfile2 = getFixturePath('samenestedfile2.json');
  console.log = jest.fn();
  genDiff(sameNestedfile1, sameNestedfile2, { format: 'plain' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[plainSameNestedFile]]);
});

test('check differences: same nested files (json)', () => {
  const sameNestedfile1 = getFixturePath('samenestedfile1.json');
  const sameNestedfile2 = getFixturePath('samenestedfile2.json');
  console.log = jest.fn();
  genDiff(sameNestedfile1, sameNestedfile2, { format: 'json' });
  const jsonNestedFiles = readFileSync('./__fixtures__/json_output/json_nestedfiles.json', 'utf8');
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[jsonNestedFiles]]);
});

test('check differences: different files, key has in first file (stylish)', () => {
  const difString1file1 = getFixturePath('dif1file1.json');
  const difString1file2 = getFixturePath('dif1file2.json');
  console.log = jest.fn();
  genDiff(difString1file1, difString1file2, { format: 'stylish' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[dif1File]]);
});

test('check differences: different files, key has in first file (plain)', () => {
  const difString1file1 = getFixturePath('dif1file1.json');
  const difString1file2 = getFixturePath('dif1file2.json');
  console.log = jest.fn();
  genDiff(difString1file1, difString1file2, { format: 'plain' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[plainDif1File]]);
});

test('check differences: different files, key has in first file (json)', () => {
  const difString1file1 = getFixturePath('dif1file1.json');
  const difString1file2 = getFixturePath('dif1file2.json');
  console.log = jest.fn();
  genDiff(difString1file1, difString1file2, { format: 'json' });
  const jsonDif1File = readFileSync('./__fixtures__/json_output/json_dif1file.json', 'utf8');
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[jsonDif1File]]);
});

test('check differences: different files, keys has in second file (stylish)', () => {
  const difString2file1 = getFixturePath('dif2file1.json');
  const difString2file2 = getFixturePath('dif2file2.json');
  console.log = jest.fn();
  genDiff(difString2file1, difString2file2, { format: 'stylish' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[dif2File]]);
});

test('check differences: different files, keys has in second file (plain))', () => {
  const difString2file1 = getFixturePath('dif2file1.json');
  const difString2file2 = getFixturePath('dif2file2.json');
  console.log = jest.fn();
  genDiff(difString2file1, difString2file2, { format: 'plain' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[plainDif2File]]);
});

test('check differences: different files, keys has in second file (json)', () => {
  const difString2file1 = getFixturePath('dif2file1.json');
  const difString2file2 = getFixturePath('dif2file2.json');
  console.log = jest.fn();
  genDiff(difString2file1, difString2file2, { format: 'json' });
  const jsonDif2File = readFileSync('./__fixtures__/json_output/json_dif2file.json', 'utf8');
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[jsonDif2File]]);
});

test('check differences: empty files (stylish)', () => {
  const emptyFile1 = getFixturePath('emptyfile1.json');
  const emptyFile2 = getFixturePath('emptyfile2.json');
  console.log = jest.fn();
  genDiff(emptyFile1, emptyFile2, { format: 'stylish' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[emptyFile]]);
});

test('check differences: empty files (plain)', () => {
  const emptyFile1 = getFixturePath('emptyfile1.json');
  const emptyFile2 = getFixturePath('emptyfile2.json');
  console.log = jest.fn();
  genDiff(emptyFile1, emptyFile2, { format: 'plain' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[plainEmptyFile]]);
});

test('check differences: empty files (json)', () => {
  const emptyFile1 = getFixturePath('emptyfile1.json');
  const emptyFile2 = getFixturePath('emptyfile2.json');
  console.log = jest.fn();
  genDiff(emptyFile1, emptyFile2, { format: 'json' });
  const jsonEmptyFile = readFileSync('./__fixtures__/json_output/json_emptyfiles.json', 'utf8');
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[jsonEmptyFile]]);
});

test('check differences: same files, different values (stylish)', () => {
  const difValue1 = getFixturePath('difvalue1.json');
  const difValue2 = getFixturePath('difvalue2.json');
  console.log = jest.fn();
  genDiff(difValue1, difValue2, { format: 'stylish' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[difValue]]);
});

test('check differences: same files, different values (plain)', () => {
  const difValue1 = getFixturePath('difvalue1.json');
  const difValue2 = getFixturePath('difvalue2.json');
  console.log = jest.fn();
  genDiff(difValue1, difValue2, { format: 'plain' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[plainDifValue]]);
});

test('check differences: same files, different values (json)', () => {
  const difValue1 = getFixturePath('difvalue1.json');
  const difValue2 = getFixturePath('difvalue2.json');
  console.log = jest.fn();
  genDiff(difValue1, difValue2, { format: 'json' });
  const jsonDifValue = readFileSync('./__fixtures__/json_output/json_difvalue.json', 'utf8');
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[jsonDifValue]]);
});

test('check differences: different files, different values (stylish)', () => {
  const difFile1 = getFixturePath('file1.json');
  const difFile2 = getFixturePath('file2.json');
  console.log = jest.fn();
  genDiff(difFile1, difFile2, { format: 'stylish' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[nestedStructure]]);
});

test('check differences: different files, different values (plain)', () => {
  const difFile1 = getFixturePath('file1.json');
  const difFile2 = getFixturePath('file2.json');
  console.log = jest.fn();
  genDiff(difFile1, difFile2, { format: 'plain' });
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[plainNestedStructure]]);
});

test('check differences: different files, different values (json)', () => {
  const difFile1 = getFixturePath('file1.json');
  const difFile2 = getFixturePath('file2.json');
  console.log = jest.fn();
  genDiff(difFile1, difFile2, { format: 'json' });
  const jsonDifFiles = readFileSync('./__fixtures__/json_output/json_diffile.json', 'utf8');
  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls).toEqual([[jsonDifFiles]]);
});
