const path = require("path");
const genDiff = require("../src/index");
const getData = require("../src/parsers");

const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

describe("genDiff", () => {
  it("compares flat JSON files correctly", () => {
    const data1 = getData(getFixturePath("file1.json"));
    const data2 = getData(getFixturePath("file2.json"));
    expect(genDiff(data1, data2)).toBe(expected);
  });

  it("compares flat YAML files correctly", () => {
    const data1 = getData(getFixturePath("file1.yml"));
    const data2 = getData(getFixturePath("file2.yml"));
    expect(genDiff(data1, data2)).toBe(expected);
  });

  it("returns empty diff for identical objects", () => {
    const obj = { a: 1, b: "test" };
    const expectedIdentical = `{
    a: 1
    b: test
}`;
    expect(genDiff(obj, obj)).toBe(expectedIdentical);
  });
});
