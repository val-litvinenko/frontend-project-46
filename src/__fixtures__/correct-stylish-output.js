const defaultFile = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const sameFile = `{
    follow: true
    host: hexlet.io
    timeout: 100
}`;

const sameNestedFile = `{
    common: {
        setting1: Value 1
        setting2: 200
        setting3: true
        setting6: {
            doge: {
                wow: 
            }
            key: value
        }
    }
    group1: {
        baz: bas
        foo: bar
        nest: {
            key: value
        }
    }
    group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
}`;

const dif1File = `{
    common: {
      - setting1: Value 1
      - setting2: 200
        setting3: true
        setting6: {
            doge: {
                wow: 
            }
          - key: value
        }
    }
    group1: {
      - baz: bas
        foo: bar
        nest: {
            key: value
        }
    }
}`;

const dif2File = `{
    common: {
      + setting1: Value 1
      + setting2: 200
        setting3: true
        setting6: {
            doge: {
                wow: 
            }
          + key: value
        }
    }
    group1: {
      + baz: bas
        foo: bar
        nest: {
            key: value
        }
    }
}`;

const emptyFile = `{

}`;

const difValue = `{
    common: {
      - setting1: Value 1
      + setting1: Value 5
        setting2: 200
      - setting3: true
      + setting3: false
        setting6: {
            doge: {
              - wow: 
              + wow: !
            }
            key: value
        }
    }
    group1: {
        baz: bas
        foo: bar
        nest: {
            key: value
        }
    }
}`;

const nestedStructure = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

export {
  defaultFile,
  sameFile,
  dif1File,
  dif2File,
  emptyFile,
  difValue,
  nestedStructure,
  sameNestedFile,
};
