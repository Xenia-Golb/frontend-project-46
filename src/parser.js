const fs = require("fs");
const path = require("path");

const parse = (filepath) => {
  const resolvedPath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(resolvedPath, "utf-8");
  const ext = path.extname(resolvedPath).toLowerCase();

  switch (ext) {
    case ".json":
      return JSON.parse(content);
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

module.exports = parse;
