const _ = require('lodash')
const getFormatter = require('./formatters')
const getData = require('./parsers')

const isObject = (val) => _.isObject(val) && !_.isArray(val)

const buildAst = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))
  return keys.map((key) => {
    const has1 = _.has(obj1, key)
    const has2 = _.has(obj2, key)
    if (!has2) return { key, type: 'removed', value: obj1[key] }
    if (!has1) return { key, type: 'added', value: obj2[key] }
    const val1 = obj1[key]
    const val2 = obj2[key]
    if (isObject(val1) && isObject(val2)) {
      return { key, type: 'nested', children: buildAst(val1, val2) }
    }
    if (!_.isEqual(val1, val2)) {
      return { key, type: 'changed', value1: val1, value2: val2 }
    }
    return { key, type: 'unchanged', value: val1 }
  })
}

const isPath = (arg) =>
  typeof arg === 'string'
  && (arg.endsWith('.json') || arg.endsWith('.yml') || arg.endsWith('.yaml'))

const genDiff = (input1, input2, formatName = 'stylish') => {
  const data1 = isPath(input1) ? getData(input1) : input1
  const data2 = isPath(input2) ? getData(input2) : input2

  const ast = buildAst(data1, data2)
  const formatter = getFormatter(formatName)
  return formatter(ast)
}

module.exports = genDiff
