const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { isPlainObject } = require('lodash')

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data)
    case 'yaml':
    case 'yml':
      return yaml.load(data)
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}

const getFormat = filepath => {
  const ext = path.extname(filepath).toLowerCase().replace('.', '')
  if (ext === 'yml' || ext === 'yaml') {
    return 'yaml'
  }
  if (ext === 'json') {
    return 'json'
  }
  throw new Error(`Unknown file extension: ${ext}`)
}

const getData = filepath => {
  const resolvedPath = path.resolve(process.cwd(), filepath)
  const content = fs.readFileSync(resolvedPath, 'utf-8')
  const format = getFormat(filepath)
  const data = parse(content, format)

  if (!isPlainObject(data)) {
    throw new Error('Only plain objects are supported')
  }

  return data
}

module.exports = getData
