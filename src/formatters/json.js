import _ from 'lodash';
import makeConditionDict from '../utils.js';

const formatStringForJson = (identifier, key, value) => `"${identifier}_${key}":${value}`;
const addQuotes = (value) => `${_.isString(value) ? `"${value}"` : value}`;

const buildObjectString = (object, identifier) => {
  const keys = Object.keys(object);
  const objectLines = keys.map((key) => {
    if (_.isObject(object[key])) {
      return formatStringForJson(
        identifier,
        key,
        buildObjectString(object[key], identifier),
      );
    }
    return formatStringForJson(identifier, key, addQuotes(object[key]));
  });
  return `{${objectLines.join(',')}}`;
};

const generateString = (obj, conditions) => {
  switch (true) {
    case conditions.sameKey:
      return `${formatStringForJson('file1', obj.key1, addQuotes(obj.value1))},${formatStringForJson('file2', obj.key1, addQuotes(obj.value2))}`;
    case conditions.sameKeyObj1:
      return `${formatStringForJson('file1', obj.key1, buildObjectString(obj.value1, 'file1'))},${formatStringForJson('file2', obj.key2, addQuotes(obj.value2))}`;
    case conditions.sameKeyObj2:
      return `${formatStringForJson('file1', obj.key1, addQuotes(obj.value1))},${formatStringForJson('file2', obj.key2, buildObjectString(obj.value2, 'file2'))}`;
    case conditions.notKey1:
      return conditions.onlyKey2Object ? `${formatStringForJson('file1', obj.key2, 'null')},${formatStringForJson('file2', obj.key2, buildObjectString(obj.value2, 'file2'))}`
        : `${formatStringForJson('file1', obj.key2, 'null')},${formatStringForJson('file2', obj.key2, addQuotes(obj.value2))}`;
    case conditions.notKey2:
      return conditions.onlyKey1Object ? `${formatStringForJson('file1', obj.key1, buildObjectString(obj.value1, 'file1'))},${formatStringForJson('file2', obj.key1, 'null')}`
        : `${formatStringForJson('file1', obj.key1, addQuotes(obj.value1))},${formatStringForJson('file2', obj.key1, 'null')}`;
    default:
      return `${formatStringForJson('files', obj.key1, addQuotes(obj.value1))}`;
  }
};

const json = (diff) => {
  const outputArray = _.sortBy(diff, (o) => o.key1 ?? o.key2).map((obj) => {
    const CONDITIONS = makeConditionDict(obj);
    if (CONDITIONS.innerKeys) {
      return `${formatStringForJson('files', obj.key1, json(obj.children))}`;
    }
    return generateString(obj, CONDITIONS);
  });
  const output = outputArray.join(',');
  return `{${output}}`;
};

export default json;
