const path = require('path')
const genDiff = require('../src/index')
const getData = require('../src/parsers')

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename)

const expectedPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`

describe('genDiff', () => {
  it('formats diff as plain', () => {
    const data1 = getData(getFixturePath('file1.json'))
    const data2 = getData(getFixturePath('file2.json'))
    expect(genDiff(data1, data2, 'plain')).toBe(expectedPlain)
  })
  it('formats diff as json', () => {
    const data1 = getData(getFixturePath('file1.json'))
    const data2 = getData(getFixturePath('file2.json'))
    const result = genDiff(data1, data2, 'json')

    expect(() => JSON.parse(result)).not.toThrow()

    const parsed = JSON.parse(result)
    expect(parsed).toBeInstanceOf(Array)
    expect(
      parsed.some((node) => node.key === 'common' && node.type === 'nested'),
    ).toBe(true)
    expect(
      parsed.some((node) => node.key === 'group2' && node.type === 'removed'),
    ).toBe(true)
  })
})
