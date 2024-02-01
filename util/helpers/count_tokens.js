const { encode, decode } = require('@nem035/gpt-3-encoder');
/**
 *
 * @param {words promp + response} text
 * @returns
 */
export function countTokens(text, isGPT4Model = false) {
  // Use a regular expression to split the text into an array of words
  // if text is an object, convert it to a string
  // console.log('type of text', typeof text);
  // console.log(text);
  let words = 0;

  if (typeof text === 'object' || typeof text === 'array') {
    text = JSON.stringify(text);
  }

  if (isGPT4Model) {
    words = encode(text);
    return words ? words.length * 4 : 0; // Multiplica por 4 si es modelo GPT-4
  } else {
    words = encode(text);
    return words ? words.length : 0;
  }
}
