import * as wordFreqs from '../data/processed/wordFreqs.json';
import * as charFreqs from '../data/processed/charFreqs.json';

/**
 * Get character frequency statistics.
 * @param {String} character
 * @return {Dictionary}
 */
export function characterFrequency(character) {
  if (character in charFreqs) {
    return charFreqs[character];
  } else {
    return {
      symbol: character,
      index: -1,
      frequency: -1,
      percentage: -1,
      cumulativePercentage: -1,
    };
  }
}

/**
 * Get word frequency statistics.
 * @param {String} word
 * @return {Dictionary}
 */
export function wordFrequency(word) {
  if (word in wordFreqs) {
    return wordFreqs[word];
  } else {
    return {
      symbol: word,
      index: -1,
      frequency: -1,
      percentage: -1,
      cumulativePercentage: -1,
    };
  }
}

/**
 * Get sentence-level frequency statistics.
 * @param {String} sentence
 * @return {Dictionary}
 */
export function multiFrequency(sentence) {
  const charFrequencies = [...sentence].map((char, index) =>
    characterFrequency(char),
  );

  return charFrequencies;
}
