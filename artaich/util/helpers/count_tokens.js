const { encode, decode } = require('@nem035/gpt-3-encoder');
/**
 *
 * @param {words promp + response} text
 * @returns
 */
export function countTokens(text) {
  // Use a regular expression to split the text into an array of words
  // if text is an object, convert it to a string
  // console.log('type of text', typeof text);
  // console.log(text);

  if (typeof text === 'object' || typeof text === 'array') {
    text = JSON.stringify(text);
  }

  let words = encode(text);
  return words ? words.length : 0;
}
