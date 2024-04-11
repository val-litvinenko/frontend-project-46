import _ from 'lodash';
import makeConditionDict from '../utils.js';

const changes = ['removed', 'updated', 'added'];
const isString = (obj) => `${_.isString(obj) ? `'${obj}'` : obj}`;

const plain = (diff, parent = '') => {
  const outputArray = diff.filter((obj) => obj.value1 !== obj.value2 || obj.children.length > 0)
    .flatMap((obj) => {
      const CONDITIONS = makeConditionDict(obj);
      let result;
      switch (true) {
        case CONDITIONS.notKey2:
          result = `Property '${parent}${obj.key1}' was ${changes[0]}`;
          break;
        case CONDITIONS.onlyKey2:
          result = `Property '${parent}${obj.key2}' was ${changes[2]} with value: ${isString(obj.value2)}`;
          break;
        case CONDITIONS.onlyKey2Object:
          result = `Property '${parent}${obj.key2}' was ${changes[2]} with value: [complex value]`;
          break;
        case CONDITIONS.innerKeys:
          result = plain(obj.children, `${parent}${obj.key1}.`);
          break;
        case CONDITIONS.sameKeyObj1:
          result = `Property '${parent}${obj.key1}' was ${changes[1]}. From [complex value] to ${isString(obj.value2)}`;
          break;
        case CONDITIONS.sameKeyObj2:
          result = `Property '${parent}${obj.key1}' was ${changes[1]}. From ${isString(obj.value1)} to [complex value]`;
          break;
        default:
          result = `Property '${parent}${obj.key1}' was ${changes[1]}. From ${isString(obj.value1)} to ${isString(obj.value2)}`;
          break;
      }
      return result;
    })
    .filter((str) => str.length > 0)
    .sort();
  return outputArray.join('\n');
};

export default plain;
