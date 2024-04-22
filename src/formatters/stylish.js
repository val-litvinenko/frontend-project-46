import _ from 'lodash';
import DIFF_TYPE_DICT from '../utils.js';

const formatString = (depth, symbol, key, value) => `${depth}${symbol} ${key}: ${value}`;
const symbols = [' ', '+', '-'];
const COUNT_INDENT = 4;

const buildGap = (depth) => {
  const gapLevel = depth * COUNT_INDENT - 2;
  return ' '.repeat(gapLevel);
};

const formatValue = (value, depth) => {
  if (!_.isObject(value)) { return value; }
  const keys = Object.keys(value);
  const objectLines = keys.map((key) => {
    if (_.isObject(value[key])) {
      return formatString(
        buildGap(depth + 1),
        symbols[0],
        key,
        formatValue(value[key], depth + 1),
      );
    }
    return formatString(buildGap(depth + 1), symbols[0], key, value[key]);
  });
  return `{
${objectLines.join('\n')}
${' '.repeat((depth) * COUNT_INDENT)}}`;
};

const makeDiffFormat = (depth, key1, value1, key2, value2) => `${formatString(buildGap(depth), symbols[2], key1, formatValue(value1, depth))}
${formatString(buildGap(depth), symbols[1], key2, formatValue(value2, depth))}`;

const generateString = (obj, depth) => {
  switch (obj.typeDiff) {
    case DIFF_TYPE_DICT.sameKeyDiffValue:
      return makeDiffFormat(depth, obj.key1, obj.value1, obj.key2, obj.value2);
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
  const outputArray = _.sortBy(diff, (o) => o.key1 ?? o.key2).map((obj) => {
    if (obj.children.length) {
      return formatString(buildGap(currentDepth), symbols[0], obj
        .key1, stylish(obj.children, currentDepth + 1));
    }
    return generateString(obj, currentDepth);
  });
  const output = outputArray.join('\n');
  return `{
${output}
${' '.repeat((currentDepth - 1) * COUNT_INDENT)}}`;
};

export default stylish;
