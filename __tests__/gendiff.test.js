const path = require("path");
const genDiff = require("../src/index");
const getData = require("../src/parsers");

const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);

const expectedNested = `{
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

describe("genDiff", () => {
  it("compares nested JSON files", () => {
    const data1 = getData(getFixturePath("file1.json"));
    const data2 = getData(getFixturePath("file2.json"));
    expect(genDiff(data1, data2)).toBe(expectedNested);
  });

  it("compares nested YAML files", () => {
    const data1 = getData(getFixturePath("file1.yml"));
    const data2 = getData(getFixturePath("file2.yml"));
    expect(genDiff(data1, data2)).toBe(expectedNested);
  });
});
