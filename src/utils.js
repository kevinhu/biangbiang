/**
 * Convert an array of [x,y] to a dictionary of {x:y}
 * @param {Array} array
 * @return {Dictionary}
 */
export function arrayToDict(array) {
  return array.reduce(
    (dict, [key, value]) => Object.assign(dict, { [key]: value }),
    {},
  );
}

/**
 * Split the first occurrences of a delimiter, leaving
 * the rest of the string unsplit
 * @param {String} string
 * @param {delim} delim delimiter
 * @param {int} limit max number of splits
 * @return {Array}
 */
export function splitFirst(string, delim, limit) {
  const arr = string.split(delim);
  const result = arr.splice(0, limit);

  result.push(arr.join(delim));

  return result;
}

/**
 * Convert a mapping from x: [y...] to y: [x...]
 * @param {Object} mapping
 * @return {Object}
 */
export function invertMapping(mapping) {
  const inverted = {};

  for (const key of Object.keys(mapping)) {
    const values = mapping[key];

    for (const value of values) {
      if (value in inverted) {
        inverted[value].push(key);
      } else {
        inverted[value] = [key];
      }
    }
  }

  return inverted;
}
