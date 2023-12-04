import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (style, data) => {
  if (style === 'stylish') {
    return stylish(data);
  }
  if (style === 'plain') {
    return plain(data);
  }
  return 'Unknown format';
};

export default formatter;
