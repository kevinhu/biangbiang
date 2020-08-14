import * as wordFreqs from '../data/processed/wordFreqs.json';
import * as charFreqs from '../data/processed/charFreqs.json';

import { CharacterError } from './errors';

/**
 * Frequency wrapper class.
 */
class Frequency {
  /**
   * Get character frequency statistics.
   * @param {String} character
   * @return {Dictionary}
   */
  characterFrequency(character) {
    if (character.length > 1) {
      throw new CharacterError('Input is not a character', 404);
    }
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
  wordFrequency(word) {
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
  multiFrequency(sentence) {
    const charFrequencies = [...sentence].map((char, index) =>
      this.characterFrequency(char),
    );

    let indices = charFrequencies.map((x) => x['index']);
    indices = indices.filter((x) => x !== -1);

    let percentages = charFrequencies.map((x) => x['percentage']);
    percentages = percentages.filter((x) => x !== -1);

    let cumulativePercentages = charFrequencies.map(
      (x) => x['cumulativePercentage'],
    );
    cumulativePercentages = cumulativePercentages.filter((x) => x !== -1);

    return {
      byCharacter: charFrequencies,
      indices: indices,
      percentages: percentages,
      cumulativePercentages: cumulativePercentages,
    };
  }
}

export default Frequency;
