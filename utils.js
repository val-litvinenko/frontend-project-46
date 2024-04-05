const makeConditionDict = (obj) => ({
  sameKey: obj.key1 === obj.key2 && obj.value1 !== obj.value2,
  onlyKey2: obj.key1 === null,
  onlyKey1: obj.key2 === null,
  innerKeys: obj.children.length > 0,
});

export default makeConditionDict;
