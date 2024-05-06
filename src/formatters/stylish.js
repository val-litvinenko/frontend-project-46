import _ from 'lodash';
import DIFF_TYPE_DICT from '../utils.js';

const formatString = (depth, symbol, key, value) => `${depth}${symbol} ${key}: ${value}`;
const symbols = [' ', '+', '-'];
const COUNT_INDENT = 4;

const buildGap = (depth) => {
  const gapLevel = depth * COUNT_INDENT - 2;
  return ' '.repeat(gapLevel);
};

const makeWrapBraces = (str, depth) => '{'.concat('\n', str).concat('\n', ' '.repeat((depth) * COUNT_INDENT)).concat('', '}');

const formatValue = (value, depth) => {
  if (!_.isObject(value)) { return value; }
  const keys = Object.keys(value);
  const objectLines = keys.map((key) => formatString(buildGap(depth + 1), symbols[0], key, _
    .isObject(value[key]) ? formatValue(value[key], depth + 1) : value[key]));
  return makeWrapBraces(objectLines.join('\n'), depth);
};

const generateString = (obj, depth) => {
  switch (obj.typeDiff) {
    case DIFF_TYPE_DICT.sameKeyDiffValue:
      return formatString(buildGap(depth), symbols[2], obj.key1, formatValue(obj.value1, depth))
        .concat('\n', formatString(buildGap(depth), symbols[1], obj.key2, formatValue(obj.value2, depth)));
    case DIFF_TYPE_DICT.onlyKey2:
      return formatString(buildGap(depth), symbols[1], obj
        .key2, formatValue(obj.value2, depth));
    case DIFF_TYPE_DICT.onlyKey1:
      return formatString(buildGap(depth), symbols[2], obj
        .key1, formatValue(obj.value1, depth));
    default:
      return formatString(buildGap(depth), symbols[0], obj.key1, obj.value1);
  }
};

const stylish = (diff, currentDepth = 1) => {
  const outputArray = diff.map((obj) => {
    if (obj.children.length) {
      return formatString(buildGap(currentDepth), symbols[0], obj
        .key1, stylish(obj.children, currentDepth + 1));
    }
    return generateString(obj, currentDepth);
  });
  const output = outputArray.join('\n');
  return makeWrapBraces(output, currentDepth - 1);
};

export default stylish;
