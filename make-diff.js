import path from 'node:path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const generateString = (symbol, key, value) => `
  ${symbol} ${key}: ${value}`;

const generateDiffString = (JSON1, JSON2) => {
  const firstJsonKeys = _.sortBy(Object.keys(JSON1));
  const secondJsonKeys = _.sortBy(Object.keys(JSON2));

  let diff = '';

  firstJsonKeys.forEach((key) => {
    if (Object.hasOwn(JSON2, key)) {
      if (JSON1[key] !== JSON2[key]) {
        diff = `${diff}${generateString('-', key, JSON1[key])}${generateString('+', key, JSON2[key])}`;
      }
      if (JSON1[key] === JSON2[key]) {
        diff = `${diff}${generateString(' ', key, JSON1[key])}`;
      }
    } else {
      diff = `${diff}${generateString('-', key, JSON1[key])}`;
    }
  });
  const filteredKeys = secondJsonKeys.filter((key) => (!firstJsonKeys
    .includes(key)));

  filteredKeys.forEach((key) => {
    diff = `${diff}${generateString('+', key, JSON2[key])}`;
  });

  diff = `{${diff}
}`;
  return console.log(diff);
};

const genDiff = (filepath1, filepath2) => {
  const firstPathJSON = path.resolve(cwd(), filepath1);
  const secondPathJSON = path.resolve(cwd(), filepath2);
  const firstJsonString = readFileSync(firstPathJSON, 'utf8');
  const secondJsonString = readFileSync(secondPathJSON, 'utf8');
  const dataFirstJSON = JSON.parse(firstJsonString);
  const dataSecondJSON = JSON.parse(secondJsonString);

  generateDiffString(dataFirstJSON, dataSecondJSON);
};

export default genDiff;
