import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (style, data) => {
  if (style === 'stylish') {
    return stylish(data);
  }
  if (style === 'plain') {
    return plain(data);
  }
  if (style === 'json') {
    return json(data);
  }
  return 'Unknown format';
};

export default formatter;
