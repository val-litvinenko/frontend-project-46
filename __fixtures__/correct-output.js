const defaultFile = `{
  - follow: false,
    host: hexlet.io,
  - proxy: 123.234.53.22,
  + timeout: 20,
  - timeout: 50,
  + verbose: true
}`;

const sameFile = `{
    follow: true,
    host: hexlet.io,
    timeout: 100
}`;

const dif1File = `{
    follow: true,
    host: hexlet.io,
  - timeout: 100
}`;

const dif2File = `{
  + follow: true,
    host: hexlet.io,
  + proxy: 123.234.53.22,
    timeout: 100
}`;

const emptyFile = `{
}`;

const difValue = `{
  + follow: false,
  - follow: true,
    proxy: 123.234.53.22,
  + timeout: 100,
  - timeout: 300
}`;

export {
  defaultFile,
  sameFile,
  dif1File,
  dif2File,
  emptyFile,
  difValue,
};
