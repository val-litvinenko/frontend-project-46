import yaml from 'js-yaml';
import path from 'node:path';

const JSONparser = (data) => JSON.parse(data);
const YAMLparser = (data) => yaml.load(data);

const parser = (filepath, filedata) => {
  const extname = path.extname(filepath);
  let parsedData;
  if (extname === '.json') {
    parsedData = JSONparser(filedata);
  }
  if (extname === '.yml') {
    parsedData = YAMLparser(filedata);
    if (!parsedData) {
      return {};
    }
  }
  return parsedData;
};

export default parser;
