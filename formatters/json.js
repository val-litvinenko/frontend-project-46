import _ from 'lodash';
import makeConditionDict from '../utils.js';

const generateStringForJson = (identifier, key, value) => `"${identifier}_${key}":${value}`;
const addQuotes = (value) => `${_.isString(value) ? `"${value}"` : value}`;

const buildObjectString = (object, identifier) => {
  const keys = Object.keys(object);
  const objectLines = keys.map((key) => {
    if (_.isObject(object[key])) {
      return generateStringForJson(
        identifier,
        key,
        buildObjectString(object[key], identifier),
      );
    }
    return generateStringForJson(identifier, key, addQuotes(object[key]));
  });
  return `{${objectLines.join(',')}}`;
};

const json = (diff) => {
  const outputArray = _.sortBy(diff, (o) => o.key1 ?? o.key2).map((obj) => {
    const CONDITIONS = makeConditionDict(obj);
    let result;
    switch (true) {
      case CONDITIONS.sameKey:
        result = `${generateStringForJson('file1', obj.key1, addQuotes(obj.value1))},${generateStringForJson('file2', obj.key1, addQuotes(obj.value2))}`;
        break;
      case CONDITIONS.sameKeyObj1:
        result = `${generateStringForJson('file1', obj.key1, buildObjectString(obj.value1, 'file1'))},${generateStringForJson('file2', obj.key2, addQuotes(obj.value2))}`;
        break;
      case CONDITIONS.sameKeyObj2:
        result = `${generateStringForJson('file1', obj.key1, addQuotes(obj.value1))},${generateStringForJson('file2', obj.key2, buildObjectString(obj.value2, 'file2'))}`;
        break;
      case CONDITIONS.onlyKey2:
        result = `${generateStringForJson('file1', obj.key2, 'null')},${generateStringForJson('file2', obj.key2, addQuotes(obj.value2))}`;
        break;
      case CONDITIONS.onlyKey2Object:
        result = `${generateStringForJson('file1', obj.key2, 'null')},${generateStringForJson('file2', obj.key2, buildObjectString(obj.value2, 'file2'))}`;
        break;
      case CONDITIONS.onlyKey1Object:
        result = `${generateStringForJson('file1', obj.key1, buildObjectString(obj.value1, 'file1'))},${generateStringForJson('file2', obj.key1, 'null')}`;
        break;
      case CONDITIONS.onlyKey1:
        result = `${generateStringForJson('file1', obj.key1, addQuotes(obj.value1))},${generateStringForJson('file2', obj.key1, 'null')}`;
        break;
      case CONDITIONS.innerKeys:
        result = `${generateStringForJson('files', obj.key1, json(obj.children))}`;
        break;
      default:
        result = `${generateStringForJson('files', obj.key1, addQuotes(obj.value1))}`;
        break;
    }
    return result;
  });
  const output = outputArray.join(',');
  return `{${output}}`;
};

export default json;
