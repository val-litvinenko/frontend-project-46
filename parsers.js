import yaml from 'js-yaml';
import path from 'node:path';

const JSONparser = (data) => JSON.parse(data);
const YAMLparser = (data) => yaml.load(data);

const parser = (filepath, filedata) => {
  const extname = path.extname(filepath);
  if (extname === '.json') {
    return JSONparser(filedata);
  }
  if (extname === '.yml' || extname === '.yaml') {
    return YAMLparser(filedata);
  }
  return {};
};

export default parser;
