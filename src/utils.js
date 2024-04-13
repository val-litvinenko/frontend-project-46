import _ from 'lodash';

const makeConditionDict = (obj) => ({
  sameKey: obj.key1 === obj.key2 && obj.value1 !== obj.value2
    && !(_.isObject(obj.value1)) && !(_.isObject(obj.value2)),
  sameKeyObj1: obj.key1 === obj.key2 && _.isObject(obj.value1),
  sameKeyObj2: obj.key1 === obj.key2 && _.isObject(obj.value2),
  onlyKey1: obj.key2 === null && !(_.isObject(obj.value1)),
  onlyKey1Object: obj.key2 === null && _.isObject(obj.value1),
  onlyKey2: obj.key1 === null && !(_.isObject(obj.value2)),
  onlyKey2Object: obj.key1 === null && _.isObject(obj.value2),
  innerKeys: obj.children.length > 0,
  notKey1: !obj.key1,
  notKey2: !obj.key2,
  objVal1: _.isObject(obj.value1),
});

export default makeConditionDict;
