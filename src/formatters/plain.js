import _ from 'lodash';
import DIFF_TYPE_DICT from '../utils.js';

const changes = ['removed', 'updated', 'added'];

const formatValue = (value) => {
  if (_.isObject(value)) { return '[complex value]'; }
  return `${_.isString(value) ? `'${value}'` : value}`;
};

const generateString = (obj, parent) => {
  switch (obj.typeDiff) {
    case DIFF_TYPE_DICT.onlyKey1:
      return `Property '${parent}${obj.key1}' was ${changes[0]}`;
    case DIFF_TYPE_DICT.onlyKey2:
      return `Property '${parent}${obj.key2}' was ${changes[2]} with value: ${formatValue(obj.value2)}`;
    default:
      return `Property '${parent}${obj.key1}' was ${changes[1]}. From ${formatValue(obj.value1)} to ${formatValue(obj.value2)}`;
  }
};

const plain = (diff, parent = '') => {
  const outputArray = _.sortBy(diff, (o) => o.key1 ?? o.key2).filter((obj) => obj
    .value1 !== obj.value2 || obj.children.length > 0)
    .flatMap((obj) => {
      if (obj.children.length) {
        return plain(obj.children, `${parent}${obj.key1 ?? obj.key2}.`);
      }
      return generateString(obj, parent);
    })
    .filter((str) => str.length > 0);
  return outputArray.join('\n');
};

export default plain;
