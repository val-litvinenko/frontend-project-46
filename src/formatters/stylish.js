import _ from 'lodash';
import makeConditionDict from '../utils.js';

const formatString = (depth, symbol, key, value) => `${depth}${symbol} ${key}: ${value}`;
const symbols = [' ', '+', '-'];
const COUNT_INDENT = 4;

const buildGap = (depth) => {
  const gapLevel = depth * COUNT_INDENT - 2;
  return ' '.repeat(gapLevel);
};

const makeDiffFormat = (depth, key1, value1, key2, value2) => `${formatString(buildGap(depth), symbols[2], key1, value1)}
${formatString(buildGap(depth), symbols[1], key2, value2)}`;

const makeObjStr = (object, depth) => {
  const keys = Object.keys(object);
  const objectLines = keys.map((key) => {
    if (_.isObject(object[key])) {
      return formatString(
        buildGap(depth + 1),
        symbols[0],
        key,
        makeObjStr(object[key], depth + 1),
      );
    }
    return formatString(buildGap(depth + 1), symbols[0], key, object[key]);
  });
  return `{
${objectLines.join('\n')}
${' '.repeat((depth) * COUNT_INDENT)}}`;
};

const generateString = (obj, conditions, depth) => {
  switch (true) {
    case conditions.sameKey:
      return makeDiffFormat(depth, obj.key1, obj.value1, obj.key2, obj.value2);
    case conditions.sameKeyObj1:
      return makeDiffFormat(depth, obj.key1, makeObjStr(obj.value1, depth), obj.key2, obj.value2);
    case conditions.sameKeyObj2:
      return makeDiffFormat(depth, obj.key1, obj.value1, obj.key2, makeObjStr(obj.value2, depth));
    case conditions.onlyKey2Object:
      return formatString(buildGap(depth), symbols[1], obj.key2, makeObjStr(obj.value2, depth));
    case conditions.onlyKey2:
      return formatString(buildGap(depth), symbols[1], obj.key2, obj.value2);
    default:
      return formatString(buildGap(depth), obj.key2 === null ? symbols[2] : symbols[0], obj
        .key1, _.isObject(obj.value1) ? makeObjStr(obj.value1, depth) : obj.value1);
  }
};

const stylish = (diff, currentDepth = 1) => {
  const outputArray = _.sortBy(diff, (o) => o.key1 ?? o.key2).map((obj) => {
    const CONDITIONS = makeConditionDict(obj);
    if (CONDITIONS.innerKeys) {
      return formatString(buildGap(currentDepth), symbols[0], obj
        .key1, stylish(obj.children, currentDepth + 1));
    }
    return generateString(obj, CONDITIONS, currentDepth);
  });
  const output = outputArray.join('\n');
  return `{
${output}
${' '.repeat((currentDepth - 1) * COUNT_INDENT)}}`;
};

export default stylish;
