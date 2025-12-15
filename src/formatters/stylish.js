const _ = require("lodash");
const INDENT_SIZE = 4;

const stringify = (value) => {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "string") return value;
  return String(value);
};

const formatValue = (value, depth) => {
  if (_.isObject(value) && !_.isArray(value)) {
    const indent = " ".repeat(depth * INDENT_SIZE);
    const innerIndent = " ".repeat((depth + 1) * INDENT_SIZE);
    const lines = Object.keys(value).map((key) => {
      const val = value[key];
      if (_.isObject(val) && !_.isArray(val)) {
        const nested = formatValue(val, depth + 1);
        return `${innerIndent}${key}: ${nested}`;
      }
      return `${innerIndent}${key}: ${stringify(val)}`;
    });
    return `{\n${lines.join("\n")}\n${indent}}`;
  }
  return stringify(value);
};

const iter = (ast, depth = 0) => {
  const indent = " ".repeat(depth * INDENT_SIZE);
  const lines = ast.map((node) => {
    const { key, type } = node;

    switch (type) {
      case "added":
        return `${indent}  + ${key}: ${formatValue(node.value, depth + 1)}`;
      case "removed":
        return `${indent}  - ${key}: ${formatValue(node.value, depth + 1)}`;
      case "changed":
        return [
          `${indent}  - ${key}: ${formatValue(node.value1, depth + 1)}`,
          `${indent}  + ${key}: ${formatValue(node.value2, depth + 1)}`,
        ].join("\n");
      case "unchanged":
        return `${indent}    ${key}: ${formatValue(node.value, depth + 1)}`;
      case "nested":
        const nestedLines = iter(node.children, depth + 1);
        return `${indent}    ${node.key}: {\n${nestedLines}\n${indent}    }`;

      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });

  return lines.join("\n");
};

const stylish = (ast) => `{\n${iter(ast)}\n}`;

module.exports = stylish;
