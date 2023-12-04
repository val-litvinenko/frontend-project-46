import _ from 'lodash';

const changes = ['removed', 'updated', 'added'];
const isString = (obj) => `${_.isString(obj) ? `'${obj}'` : obj}`;

const plain = (diff, parent = '') => {
  const outputArray = diff.filter((obj) => obj.value1 !== obj.value2 || obj.children.length > 0)
    .flatMap((obj) => {
      if (!obj.key2) {
        return `Property '${parent}${obj.key1}' was ${changes[0]}`;
      }
      if (!obj.key1) {
        return `Property '${parent}${obj.key2}' was ${changes[2]} with value: ${_.isObject(obj.value2) ? '[complex value]' : `${isString(obj.value2)}`}`;
      }
      if (obj.children.length > 0) {
        return plain(obj.children, `${parent}${obj.key1}.`);
      }
      return `Property '${parent}${obj.key1}' was ${changes[1]}. From ${_.isObject(obj
        .value1) ? '[complex value]' : `${isString(obj.value1)}`} to ${_.isObject(obj.value2) ? '[complex value]' : `${isString(obj.value2)}`}`;
    })
    .filter((str) => str.length > 0)
    .sort();
  return outputArray.join('\n');
};

export default plain;
