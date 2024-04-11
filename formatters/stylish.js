import _ from 'lodash';
import makeConditionDict from '../utils.js';

const generateStringForStylish = (depth, symbol, key, value) => `${depth}${symbol} ${key}: ${value}`;
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
      return generateStringForStylish(
        buildGap(depth + 1),
        symbols[0],
        key,
        buildObjectString(object[key], depth + 1),
      );
    }
    return generateStringForStylish(buildGap(depth + 1), symbols[0], key, object[key]);
  });
  return `{
${objectLines.join('\n')}
${' '.repeat((depth) * COUNT_INDENT)}}`;
};

const stylish = (diff, currentDepth = 1) => {
  const outputArray = _.sortBy(diff, (o) => o.key1 ?? o.key2).map((obj) => {
    const CONDITIONS = makeConditionDict(obj);
    let result;
    switch (true) {
      case CONDITIONS.sameKey:
        result = `${generateStringForStylish(buildGap(currentDepth), symbols[2], obj.key1, obj.value1)}
${generateStringForStylish(buildGap(currentDepth), symbols[1], obj.key2, obj.value2)}`;
        break;
      case CONDITIONS.sameKeyObj1:
        result = `${generateStringForStylish(buildGap(currentDepth), symbols[2], obj.key1, buildObjectString(obj.value1, currentDepth))}
${generateStringForStylish(buildGap(currentDepth), symbols[1], obj.key2, obj.value2)}`;
        break;
      case CONDITIONS.sameKeyObj2:
        result = `${generateStringForStylish(buildGap(currentDepth), symbols[2], obj.key1, obj.value1)}
${generateStringForStylish(buildGap(currentDepth), symbols[1], obj.key2, buildObjectString(obj.value2, currentDepth))}`;
        break;
      case CONDITIONS.onlyKey2Object:
        result = generateStringForStylish(buildGap(currentDepth), symbols[1], obj
          .key2, buildObjectString(obj.value2, currentDepth));
        break;
      case CONDITIONS.onlyKey2:
        result = generateStringForStylish(buildGap(currentDepth), symbols[1], obj
          .key2, obj.value2);
        break;
      case CONDITIONS.onlyKey1Object:
        result = generateStringForStylish(buildGap(currentDepth), symbols[2], obj
          .key1, buildObjectString(obj.value1, currentDepth));
        break;
      case CONDITIONS.onlyKey1:
        result = generateStringForStylish(buildGap(currentDepth), symbols[2], obj
          .key1, obj.value1);
        break;
      case CONDITIONS.innerKeys:
        result = generateStringForStylish(buildGap(currentDepth), symbols[0], obj
          .key1, stylish(obj.children, currentDepth + 1));
        break;
      default:
        result = generateStringForStylish(buildGap(currentDepth), symbols[0], obj.key1, obj.value1);
        break;
    }
    return result;
  });
  const output = outputArray.join('\n');
  return `{
${output}
${' '.repeat((currentDepth - 1) * COUNT_INDENT)}}`;
};

export default stylish;
