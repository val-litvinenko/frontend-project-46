import _ from 'lodash';
import DIFF_TYPE_DICT from '../utils.js';

const formatStringForJson = (identifier, key, value) => `"${identifier}_${key}":${value}`;

const manageQuotes = (value) => `${_.isString(value) ? `"${value}"` : value}`;

const formatValue = (value, identifier) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const objectLines = keys
      .map((key) => formatStringForJson(identifier, key, formatValue(value[key], identifier)));
    return `{${objectLines.join(',')}}`;
  }
  return manageQuotes(value);
};

const generateString = (obj) => {
  switch (obj.typeDiff) {
    case DIFF_TYPE_DICT.sameKeyDiffValue:
      return `${formatStringForJson('file1', obj.key1, formatValue(obj.value1, 'file1'))},${formatStringForJson('file2', obj.key1, formatValue(obj.value2, 'file2'))}`;
    case DIFF_TYPE_DICT.onlyKey1:
      return `${formatStringForJson('file1', obj.key1, formatValue(obj.value1, 'file1'))},${formatStringForJson('file2', obj.key1, 'null')}`;
    case DIFF_TYPE_DICT.onlyKey2:
      return `${formatStringForJson('file1', obj.key2, 'null')},${formatStringForJson('file2', obj.key2, formatValue(obj.value2, 'file2'))}`;
    default:
      return `${formatStringForJson('files', obj.key1, formatValue(obj.value1, 'files'))}`;
  }
};

const json = (diff) => {
  const outputArray = diff.map((obj) => {
    if (obj.children.length) {
      return `${formatStringForJson('files', obj.key1, json(obj.children))}`;
    }
    return generateString(obj);
  });
  const output = outputArray.join(',');
  return `{${output}}`;
};

export default json;
