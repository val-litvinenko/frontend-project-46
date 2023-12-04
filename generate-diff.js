import _ from 'lodash';

const generateDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2);
  const diff = keys.map((key) => {
    const key1 = Object.hasOwn(obj1, key) ? key : null;
    const key2 = Object.hasOwn(obj2, key) ? key : null;
    const isObjectV1 = _.isObject(obj1[key]);
    const isObjectV2 = _.isObject(obj2[key]);
    let children = [];
    if (isObjectV1 && isObjectV2) {
      children = generateDiff(obj1[key], obj2[key]);
    }
    const value1 = isObjectV1 && isObjectV2 ? null : obj1[key];
    const value2 = isObjectV1 && isObjectV2 ? null : obj2[key];
    return {
      key1,
      key2,
      value1,
      value2,
      children,
    };
  });
  return diff;
};

export default generateDiff;
