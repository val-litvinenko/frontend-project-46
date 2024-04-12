import _ from 'lodash';

const hasValue = (obj1, obj2, key) => _.isObject(obj1[key]) && _.isObject(obj2[key]);

const generateDiffItem = (obj1, obj2, key) => {
  const key1 = Object.hasOwn(obj1, key) ? key : null;
  const key2 = Object.hasOwn(obj2, key) ? key : null;

  const value1 = hasValue(obj1, obj2, key) ? null : obj1[key];
  const value2 = hasValue(obj1, obj2, key) ? null : obj2[key];
  return {
    key1,
    key2,
    value1,
    value2,
  };
};

const generateDiff = (obj1, obj2) => {
  const keys1 = obj1 ? Object.keys(obj1) : [];
  const keys2 = obj2 ? Object.keys(obj2) : [];
  const keys = _.union(keys1, keys2);
  const diff = keys.map((key) => {
    const children = [];
    if (hasValue(obj1, obj2, key)) {
      children.push(...generateDiff(obj1[key], obj2[key]));
    }
    const diffItem = generateDiffItem(obj1, obj2, key);
    return { ...diffItem, children };
  });
  return diff;
};

export default generateDiff;
