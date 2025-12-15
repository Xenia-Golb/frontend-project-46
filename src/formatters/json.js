const _ = require('lodash')

const formatValue = (value) => {
  if (_.isObject(value) && !_.isArray(value)) {
    return JSON.parse(JSON.stringify(value))
  }
  return value
}

const buildJson = (ast) => {
  return ast.map((node) => {
    switch (node.type) {
      case 'added':
        return {
          key: node.key,
          type: node.type,
          value: formatValue(node.value),
        }
      case 'removed':
        return {
          key: node.key,
          type: node.type,
          value: formatValue(node.value),
        }
      case 'changed':
        return {
          key: node.key,
          type: node.type,
          value1: formatValue(node.value1),
          value2: formatValue(node.value2),
        }
      case 'unchanged':
        return {
          key: node.key,
          type: node.type,
          value: formatValue(node.value),
        }
      case 'nested':
        return {
          key: node.key,
          type: node.type,
          children: buildJson(node.children),
        }
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })
}

const json = ast => JSON.stringify(buildJson(ast), null, 4)

module.exports = json
