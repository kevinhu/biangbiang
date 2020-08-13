import * as simplifiedDictionary from '../data/processed/simplifiedDictionary.json';
import * as traditionalDictionary from '../data/processed/traditionalDictionary.json';
import * as mergedDictionary from '../data/processed/mergedDictionary.json';

import * as charToWords from '../data/processed/charToWords.json';

import * as simplifiedTraditional from '../data/processed/simplifiedTraditional.json';

/**
 * Dictionary errors object
 */
class DictionaryError extends Error {
  /**
   * Default constructor
   * @param {String} message
   * @param {Int} code
   */
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

/**
 * Get the definition of a word.
 * @param {String} word
 * @param {String} dictionary Dictionary to use; "simplified", "traditional", or "merged"
 * @return {Dictionary}
 */
export function define(word, dictionary) {
  let selectedDictionary;

  switch (dictionary) {
    case 'simplified':
      selectedDictionary = simplifiedDictionary;

      break;

    case 'traditional':
      selectedDictionary = traditionalDictionary;
      break;

    case 'merged':
      selectedDictionary = mergedDictionary;
      break;

    default:
      throw new DictionaryError(
        "Dictionary must be 'simplified', 'traditional', or 'merged'",
        404,
      );
  }

  if (word in selectedDictionary) {
    return selectedDictionary[word];
  } else {
    return {
      simplified: -1,
      traditional: -1,
      pinyin: -1,
      definition: -1,
    };
  }
}

/**
 * Get whether a character is traditional, simplified, or both.
 * @param {String} character
 * @return {Dictionary}
 */
export function kind(character) {
  if (character in simplifiedTraditional) {
    return simplifiedTraditional[character];
  } else {
    return {
      type: -1,
      other: '',
    };
  }
}

/**
 * Get words containing a character.
 * @param {String} character
 * @return {Array}
 */
export function wordsContaining(character) {
  if (character in charToWords) {
    return charToWords[character];
  } else {
    return [];
  }
}
