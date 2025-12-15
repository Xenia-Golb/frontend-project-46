const _ = require('lodash')

const stringify = (value) => {
  if (_.isObject(value) && !_.isArray(value)) {
    return '[complex value]'
  }
  if (value === null) return 'null'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const buildPlainLines = (ast, path = []) => {
  return ast.flatMap((node) => {
    const currentPath = [...path, node.key].join('.')

    switch (node.type) {
      case 'added':
        return [
          `Property '${currentPath}' was added with value: ${stringify(
            node.value,
          )}`,
        ]
      case 'removed':
        return [`Property '${currentPath}' was removed`]
      case 'changed':
        return [
          `Property '${currentPath}' was updated. From ${stringify(
            node.value1,
          )} to ${stringify(node.value2)}`,
        ]
      case 'nested':
        return buildPlainLines(node.children, [...path, node.key])
      default:
        return []
    }
  })
}

const plain = (ast) => buildPlainLines(ast).join('\n')

module.exports = plain
