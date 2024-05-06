import _ from 'lodash';
import DIFF_TYPE_DICT from './utils.js';

const isObjects = (obj1, obj2, key) => _.isObject(obj1[key]) && _.isObject(obj2[key]);

const getTypeDiff = (key1, key2, value1, value2) => {
  if (key1 === key2 && value1 !== value2) {
    return DIFF_TYPE_DICT.sameKeyDiffValue;
  }
  if (key1 === null) { return DIFF_TYPE_DICT.onlyKey2; }
  if (key2 === null) { return DIFF_TYPE_DICT.onlyKey1; }
  return DIFF_TYPE_DICT.sameKeySameValue;
};

const generateDiffItem = (obj1, obj2, key) => {
  const key1 = Object.hasOwn(obj1, key) ? key : null;
  const key2 = Object.hasOwn(obj2, key) ? key : null;

  const value1 = isObjects(obj1, obj2, key) ? null : obj1[key];
  const value2 = isObjects(obj1, obj2, key) ? null : obj2[key];
  return {
    key1,
    key2,
    value1,
    value2,
    typeDiff: getTypeDiff(key1, key2, value1, value2),
  };
};

const generateDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2);
  const diff = keys.map((key) => {
    const children = isObjects(file1, file2, key) ? generateDiff(file1[key], file2[key]) : [];
    const diffItem = generateDiffItem(file1, file2, key);
    return { ...diffItem, children };
  });
  return _.sortBy(diff, (o) => o.key1 ?? o.key2);
};

export default generateDiff;
