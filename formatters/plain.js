import _ from 'lodash';
import makeConditionDict from '../utils.js';

const changes = ['removed', 'updated', 'added'];
const isString = (obj) => `${_.isString(obj) ? `'${obj}'` : obj}`;
const generateString = (obj, conditions, parent) => {
  switch (true) {
    case conditions.notKey2:
      return `Property '${parent}${obj.key1}' was ${changes[0]}`;
    case conditions.onlyKey2:
      return `Property '${parent}${obj.key2}' was ${changes[2]} with value: ${isString(obj.value2)}`;
    case conditions.onlyKey2Object:
      return `Property '${parent}${obj.key2}' was ${changes[2]} with value: [complex value]`;
    default:
      return `Property '${parent}${obj.key1}' was ${changes[1]}. From ${_.isObject(obj
        .value1) ? '[complex value]' : `${isString(obj.value1)}`} to ${_.isObject(obj.value2) ? '[complex value]' : `${isString(obj.value2)}`}`;
  }
};

const plain = (diff, parent = '') => {
  const outputArray = _.sortBy(diff, (o) => o.key1 ?? o.key2).filter((obj) => obj
    .value1 !== obj.value2 || obj.children.length > 0)
    .flatMap((obj) => {
      const CONDITIONS = makeConditionDict(obj);
      if (CONDITIONS.innerKeys) {
        return plain(obj.children, `${parent}${obj.key1}.`);
      }
      return generateString(obj, CONDITIONS, parent);
    })
    .filter((str) => str.length > 0);
  return outputArray.join('\n');
};

export default plain;
