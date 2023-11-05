import path from 'node:path';
import { cwd } from 'node:process';
import _ from 'lodash';
import { readFileSync } from 'node:fs';
import parser from './parsers.js';
import generateDiff from './generate-diff.js';

const generateString = (depth, symbol, key, value) => `${depth}${symbol} ${key}: ${value}`;
const symbols = [' ', '+', '-'];
const COUNT_INDENT = 4;

const buildGap = (depth) => {
  const gapLevel = depth * COUNT_INDENT - 2;
  return ' '.repeat(gapLevel);
};

const buildObjectString = (object, depth) => {
  const keys = Object.keys(object);
  const objectLines = keys.map((key) => {
    if (_.isObject(object[key])) {
      return generateString(
        buildGap(depth + 1),
        symbols[0],
        key,
        buildObjectString(object[key], depth + 1),
      );
    }
    return generateString(buildGap(depth + 1), symbols[0], key, object[key]);
  });
  return `{
${objectLines.join('\n')}
${' '.repeat((depth) * COUNT_INDENT)}}`;
};

const stylish = (diffArr, originArr, depth = 1) => {
  const arrayWithCurrentDepth = diffArr.filter((object) => object.depth === depth);
  const outputArray = _.sortBy(arrayWithCurrentDepth, (o) => o.key1 ?? o.key2).map((obj) => {
    const gap = buildGap(obj.depth);
    if (obj.key1 === obj.key2 && obj.value1 === obj.value2) {
      if (_.isObject(obj.value1)) {
        const string = stylish(
          originArr.filter((child) => child.parent === obj.key1),
          originArr,
          depth + 1,
        );
        return generateString(gap, symbols[0], obj.key1, string);
      }
      return generateString(gap, symbols[0], obj.key1, obj.value1);
    }
    if (obj.key1 === obj.key2 && obj.value1 !== obj.value2) {
      if (_.isObject(obj.value1)) {
        return `${generateString(gap, symbols[2], obj.key1, buildObjectString(obj.value1, obj.depth))}
${generateString(gap, symbols[1], obj.key2, obj.value2)}`;
      }
      if (_.isObject(obj.value2)) {
        return `${generateString(gap, symbols[2], obj.key1, obj.value1)}
${generateString(gap, symbols[1], obj.key2, buildObjectString(obj.value2, obj.depth))}`;
      }
      return `${generateString(gap, symbols[2], obj.key1, obj.value1)}
${generateString(gap, symbols[1], obj.key2, obj.value2)}`;
    }
    if (obj.key2 === null) {
      if (_.isObject(obj.value1)) {
        return generateString(gap, symbols[2], obj.key1, buildObjectString(obj.value1, obj.depth));
      }
      return generateString(gap, symbols[2], obj.key1, obj.value1);
    }
    if (obj.key1 === null) {
      if (_.isObject(obj.value2)) {
        return generateString(gap, symbols[1], obj.key2, buildObjectString(obj.value2, obj.depth));
      }
      return generateString(gap, symbols[1], obj.key2, obj.value2);
    }
    return '';
  });
  const output = outputArray.join('\n');
  return `{
${output}
${' '.repeat((depth - 1) * COUNT_INDENT)}}`;
};

const genDiff = (filepath1, filepath2, type) => {
  const firstPathFile = path.resolve(cwd(), filepath1);
  const secondPathFile = path.resolve(cwd(), filepath2);
  const firstString = readFileSync(firstPathFile, 'utf8');
  const secondString = readFileSync(secondPathFile, 'utf8');
  const parsedFirstFile = parser(firstPathFile, firstString);
  const parsedSecondFile = parser(secondPathFile, secondString);
  const difference = generateDiff(parsedFirstFile, parsedSecondFile);
  if (type === 'stylish') {
    console.log(stylish(difference, difference));
  }
};

export default genDiff;
