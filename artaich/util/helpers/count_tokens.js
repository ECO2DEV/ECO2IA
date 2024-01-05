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

  if (typeof text === 'object' || typeof text === 'array') {
    text = JSON.stringify(text);
  }

  if (isGPT4Model) {
    return text ? text.length * 4 : 0;
  }
  // console.log('text', text);
  let words = encode(text);
  // if it is a GPT-4 model, multiply the tokens by 4

  // console.log('words', words);
  return words ? words.length : 0;
}
