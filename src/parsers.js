import yaml from 'js-yaml';

const JSONparser = (data) => JSON.parse(data);
const YAMLparser = (data) => yaml.load(data);

const parser = (extname, filedata) => {
  switch (extname) {
    case '.json': {
      return JSONparser(filedata);
    }
    case '.yml':
    case '.yaml': {
      return YAMLparser(filedata);
    }
    default:
      throw new Error('Unkown format');
  }
};

export default parser;
