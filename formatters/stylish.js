import _ from 'lodash';
import makeConditionDict from '../utils.js';

const formatStringForStylish = (depth, symbol, key, value) => `${depth}${symbol} ${key}: ${value}`;
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
      return formatStringForStylish(
        buildGap(depth + 1),
        symbols[0],
        key,
        buildObjectString(object[key], depth + 1),
      );
    }
    return formatStringForStylish(buildGap(depth + 1), symbols[0], key, object[key]);
  });
  return `{
${objectLines.join('\n')}
${' '.repeat((depth) * COUNT_INDENT)}}`;
};

const generateStringForStylish = (obj, conditions, currentDepth) => {
  let result;
  switch (true) {
    case conditions.sameKey:
      result = `${formatStringForStylish(buildGap(currentDepth), symbols[2], obj.key1, obj.value1)}
${formatStringForStylish(buildGap(currentDepth), symbols[1], obj.key2, obj.value2)}`;
      break;
    case conditions.sameKeyObj1:
      result = `${formatStringForStylish(buildGap(currentDepth), symbols[2], obj.key1, buildObjectString(obj.value1, currentDepth))}
${formatStringForStylish(buildGap(currentDepth), symbols[1], obj.key2, obj.value2)}`;
      break;
    case conditions.sameKeyObj2:
      result = `${formatStringForStylish(buildGap(currentDepth), symbols[2], obj.key1, obj.value1)}
${formatStringForStylish(buildGap(currentDepth), symbols[1], obj.key2, buildObjectString(obj.value2, currentDepth))}`;
      break;
    case conditions.onlyKey2Object:
      result = formatStringForStylish(buildGap(currentDepth), symbols[1], obj
        .key2, buildObjectString(obj.value2, currentDepth));
      break;
    case conditions.onlyKey2:
      result = formatStringForStylish(buildGap(currentDepth), symbols[1], obj
        .key2, obj.value2);
      break;
    case conditions.onlyKey1Object:
      result = formatStringForStylish(buildGap(currentDepth), symbols[2], obj
        .key1, buildObjectString(obj.value1, currentDepth));
      break;
    case conditions.onlyKey1:
      result = formatStringForStylish(buildGap(currentDepth), symbols[2], obj
        .key1, obj.value1);
      break;
    default:
      result = formatStringForStylish(buildGap(currentDepth), symbols[0], obj.key1, obj.value1);
      break;
  }
  return result;
};

const stylish = (diff, currentDepth = 1) => {
  const outputArray = _.sortBy(diff, (o) => o.key1 ?? o.key2).map((obj) => {
    const CONDITIONS = makeConditionDict(obj);
    if (CONDITIONS.innerKeys) {
      return formatStringForStylish(buildGap(currentDepth), symbols[0], obj
        .key1, stylish(obj.children, currentDepth + 1));
    }
    return generateStringForStylish(obj, CONDITIONS, currentDepth);
  });
  const output = outputArray.join('\n');
  return `{
${output}
${' '.repeat((currentDepth - 1) * COUNT_INDENT)}}`;
};

export default stylish;
