const fs = require("fs");
const path = require("path");
const genDiff = require("../src/index");

const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), "utf-8");
const readFixture = (filename) => JSON.parse(readFile(filename));

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
    const data1 = readFixture("file1.json");
    const data2 = readFixture("file2.json");
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
