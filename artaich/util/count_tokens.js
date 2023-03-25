const {encode, decode} = require('@nem035/gpt-3-encoder');
/**
 * 
 * @param {words promp + response} text 
 * @returns 
 */
export default function countTokens(text) {
    // Use a regular expression to split the text into an array of words
    let words = encode(text)
    
    // Return the length of the words array
 
    return words ? words.length : 0;

  }


  