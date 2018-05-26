/**
 * transfrom js variable name to database column name
 * @param  {string} input e.g numberOfChapters
 * @return {string}       number_of_chapters
 */
function jsToSql (input) {
  let output = input
  const regex = /[a-z][A-Z]/g
  const match = regex.exec(output)

  if (match !== null) {
    output = input.slice(0, regex.lastIndex - 1) + '_' + input.slice(regex.lastIndex - 1)
    output = jsToSql(output)
  }

  return output.toLowerCase()
}

/**
 * transfrom SQL database column name to js variable name
 * @param  {string} input number_of_chapters
 * @return {string}       numberOfChapters
 */
function sqlToJs (input) {
  let output = input
  const regex = /[a-z]_[a-z]/g
  const match = regex.exec(output)

  if (match !== null) {
    output = input.slice(0, regex.lastIndex - 2) + input.slice(regex.lastIndex - 1, regex.lastIndex).toUpperCase() + input.slice(regex.lastIndex)
    output = sqlToJs(output)
  }

  return output
}

/**
 * normalise keys of input
 * @param  {object / Array of objects} data [{ key1: value1, key2: value2, ... },...]
 * @return {object / Array of objects}      [{ key_1: value1, key_2: value2, ... },...]
 */
function normaliseKeys (data) {
  let input
  if (Array.isArray(data)) {
    input = {}
    data.keys().forEach(key => {
      input[jsToSql(key)] = data[key]
    })
  } else {
    input = []
    data.forEach(item => {
      let i = {}
      item.keys().forEach(key => {
        i[jsToSql(key)] = item[key]
      })
      input.push(i)
    })
  }

  return input
}

module.exports = { jsToSql, sqlToJs, normaliseKeys }
