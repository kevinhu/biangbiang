import { arrayToDict } from './utils';

import * as components from '../data/processed/components.json';
import * as componentsToCharacter from '../data/processed/componentsToCharacter.json';

import { CharacterError } from './errors';

/**
 * Get the component tree of a character or component.
 * @param {String} character
 * @param {int} depth
 * @return {Dictionary}
 */
export function decompose(character, depth) {
  if (character.length > 1) {
    throw new CharacterError('Input is not a character', 404);
  }

  if (!(character in components)) {
    return { [character]: character };
  }

  let decomposition = components[character];

  if (decomposition.length === 1 || depth === 0) {
    if (decomposition[0] === '') {
      return character;
    }
    return { [character]: decomposition[0] };
  }

  decomposition = decomposition.map((x) => [x, decompose(x, depth - 1)]);
  decomposition = arrayToDict(decomposition);

  return decomposition;
}

/**
 * Get characters containing a component.
 * @param {String} component
 * @return {Array}
 */
export function charactersWithComponent(component) {
  if (component.length > 1) {
    throw new CharacterError('Input is not a character', 404);
  }

  if (component in componentsToCharacter) {
    return componentsToCharacter[component];
  } else {
    return [];
  }
}
