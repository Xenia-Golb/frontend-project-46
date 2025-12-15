const _ = require("lodash");
const getFormatter = require("./formatters");

const buildAst = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return keys.map((key) => {
    const has1 = _.has(obj1, key);
    const has2 = _.has(obj2, key);

    if (!has2) {
      return { key, type: "removed", value: obj1[key] };
    }
    if (!has1) {
      return { key, type: "added", value: obj2[key] };
    }

    const val1 = obj1[key];
    const val2 = obj2[key];

    if (
      _.isObject(val1) &&
      _.isObject(val2) &&
      !_.isArray(val1) &&
      !_.isArray(val2)
    ) {
      return { key, type: "nested", children: buildAst(val1, val2) };
    }
    if (!_.isEqual(val1, val2)) {
      return { key, type: "changed", value1: val1, value2: val2 };
    }
    return { key, type: "unchanged", value: val1 };
  });
};

const genDiff = (data1, data2, formatName = "stylish") => {
  const ast = buildAst(data1, data2);
  const formatter = getFormatter(formatName);
  return formatter(ast);
};

module.exports = genDiff;
