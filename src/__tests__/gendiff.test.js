import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { expect, test, describe } from '@jest/globals';
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

const extendsTable = [['json'], ['yml']];

const styleAndFilesTable = [
  ['same nested files', 'stylish', 'samenestedfile1', 'samenestedfile2', sameNestedFile],
  ['same nested files', 'plain', 'samenestedfile1', 'samenestedfile2', plainSameNestedFile],
  ['same nested files', 'json', 'samenestedfile1', 'samenestedfile2', readFileSync('./src/__fixtures__/json_output/json_nestedfiles.json', 'utf8')],
  ['different files, key has in first file', 'stylish', 'dif1file1', 'dif1file2', dif1File],
  ['different files, key has in first file', 'plain', 'dif1file1', 'dif1file2', plainDif1File],
  ['different files, key has in first file', 'json', 'dif1file1', 'dif1file2', readFileSync('./src/__fixtures__/json_output/json_dif1file.json', 'utf8')],
  ['different files, keys has in second file', 'stylish', 'dif2file1', 'dif2file2', dif2File],
  ['same nested different files, keys has in second file', 'plain', 'dif2file1', 'dif2file2', plainDif2File],
  ['different files, keys has in second file', 'json', 'dif2file1', 'dif2file2', readFileSync('./src/__fixtures__/json_output/json_dif2file.json', 'utf8')],
  ['empty files', 'stylish', 'emptyfile1', 'emptyfile2', emptyFile],
  ['empty files', 'plain', 'emptyfile1', 'emptyfile2', plainEmptyFile],
  ['empty files', 'json', 'emptyfile1', 'emptyfile2', readFileSync('./src/__fixtures__/json_output/json_emptyfiles.json', 'utf8')],
  ['same files, different values', 'stylish', 'difvalue1', 'difvalue2', difValue],
  ['same files, different values', 'plain', 'difvalue1', 'difvalue2', plainDifValue],
  ['same files, different values', 'json', 'difvalue1', 'difvalue2', readFileSync('./src/__fixtures__/json_output/json_difvalue.json', 'utf8')],
  ['different files, different values', 'stylish', 'file1', 'file2', nestedStructure],
  ['different files, different values', 'plain', 'file1', 'file2', plainNestedStructure],
  ['different files, different values', 'json', 'file1', 'file2', readFileSync('./src/__fixtures__/json_output/json_diffile.json', 'utf8')],
];

describe.each(extendsTable)(('for %s extends'), (format) => {
  test.each(styleAndFilesTable)('Check %s: format %s', (name, style, file1, file2, expectedResult) => {
    const file1Data = getFixturePath(format, file1);
    const file2Data = getFixturePath(format, file2);
    const result = genDiff(file1Data, file2Data, style);
    expect(result).toEqual(expectedResult);
  });
});
