import _ from 'lodash';

const generateDiff = (obj1, obj2, parent = null, depth = 1) => {
  const depthFlag = {};
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2);
  const diff = keys.flatMap((key) => {
    const key1 = Object.hasOwn(obj1, key) ? key : null;
    const key2 = Object.hasOwn(obj2, key) ? key : null;
    const isObjectV1 = _.isObject(obj1[key]);
    const isObjectV2 = _.isObject(obj2[key]);
    const value1 = isObjectV1 && isObjectV2 ? depthFlag : obj1[key];
    const value2 = isObjectV1 && isObjectV2 ? depthFlag : obj2[key];
    let children = [];
    if (value1 === depthFlag && value2 === depthFlag) {
      children = generateDiff(
        (isObjectV1 ? obj1[key] : {}),
        (isObjectV2 ? obj2[key] : {}),
        key,
        depth + 1,
      );
    }
    return [
      {
        key1,
        key2,
        value1,
        value2,
        parent,
        depth,
      },
      ...children,
    ];
  });
  return diff;
};

export default generateDiff;
