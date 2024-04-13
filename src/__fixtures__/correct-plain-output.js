const plainNestedStructure = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const plainDefaultFile = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;

const plainSameFile = '';

const plainSameNestedFile = '';

const plainDif1File = `Property 'common.setting1' was removed
Property 'common.setting2' was removed
Property 'common.setting6.key' was removed
Property 'group1.baz' was removed`;

const plainDif2File = `Property 'common.setting1' was added with value: 'Value 1'
Property 'common.setting2' was added with value: 200
Property 'common.setting6.key' was added with value: 'value'
Property 'group1.baz' was added with value: 'bas'`;

const plainEmptyFile = '';

const plainDifValue = `Property 'common.setting1' was updated. From 'Value 1' to 'Value 5'
Property 'common.setting3' was updated. From true to false
Property 'common.setting6.doge.wow' was updated. From '' to '!'`;

export {
  plainNestedStructure,
  plainDefaultFile,
  plainSameFile,
  plainSameNestedFile,
  plainDif1File,
  plainDif2File,
  plainEmptyFile,
  plainDifValue,
};
