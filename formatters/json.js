import _ from 'lodash';

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
    if (obj.key1 === obj.key2 && obj.value1 !== obj.value2) {
      if (_.isObject(obj.value1)) {
        return `${generateStringForJson('file1', obj.key1, buildObjectString(obj.value1, 'file1'))},${generateStringForJson('file2', obj.key2, addQuotes(obj.value2))}`;
      }
      if (_.isObject(obj.value2)) {
        return `${generateStringForJson('file1', obj.key1, addQuotes(obj.value1))},${generateStringForJson('file2', obj.key2, buildObjectString(obj.value2, 'file2'))}`;
      }
      return `${generateStringForJson('file1', obj.key1, addQuotes(obj.value1))},${generateStringForJson('file2', obj.key1, addQuotes(obj.value2))}`;
    }
    if (obj.key1 === null) {
      if (_.isObject(obj.value2)) {
        return `${generateStringForJson('file1', obj.key2, 'null')},${generateStringForJson('file2', obj.key2, buildObjectString(obj.value2, 'file2'))}`;
      }
      return `${generateStringForJson('file1', obj.key2, 'null')},${generateStringForJson('file2', obj.key2, addQuotes(obj.value2))}`;
    }
    if (obj.key2 === null) {
      if (_.isObject(obj.value1)) {
        return `${generateStringForJson('file1', obj.key1, buildObjectString(obj.value1, 'file1'))},${generateStringForJson('file2', obj.key1, 'null')}`;
      }
      return `${generateStringForJson('file1', obj.key1, addQuotes(obj.value1))},${generateStringForJson('file2', obj.key1, 'null')}`;
    }
    if (obj.children.length > 0) {
      return `${generateStringForJson('files', obj.key1, json(obj.children))}`;
    }
    return `${generateStringForJson('files', obj.key1, addQuotes(obj.value1))}`;
  });
  const output = outputArray.join(',');
  return `{${output}}`;
};

export default json;
