const stylish = require("./stylish");
const plain = require("./plain");

const getFormatter = (formatName) => {
  const formatters = {
    stylish,
    plain,
  };

  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}`);
  }

  return formatters[formatName];
};

module.exports = getFormatter;
