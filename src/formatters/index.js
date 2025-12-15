const stylish = require("./stylish");
const plain = require("./plain");
const json = require("./json");

const getFormatter = (formatName) => {
  const formatters = {
    stylish,
    plain,
    json,
  };

  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}`);
  }

  return formatters[formatName];
};

module.exports = getFormatter;
