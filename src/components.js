import { arrayToDict } from './utils';

import components from '../data/processed/components.json';
import componentsToCharacter from '../data/processed/componentsToCharacter.json';

import { CharacterError } from './errors';

/**
 * Components wrapper class.
 */
class Components {
  /**
   * Get the component tree of a character or component.
   * @param {String} character
   * @param {int} depth
   * @return {Dictionary}
   */
  decompose(character, depth) {
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

    decomposition = decomposition.map((x) => [x, this.decompose(x, depth - 1)]);
    decomposition = arrayToDict(decomposition);

    return decomposition;
  }

  /**
   * Get characters containing a component.
   * @param {String} component
   * @return {Array}
   */
  charactersWithComponent(component) {
    if (component.length > 1) {
      throw new CharacterError('Input is not a character', 404);
    }

    if (component in componentsToCharacter) {
      return componentsToCharacter[component];
    } else {
      return [];
    }
  }
}

export default Components;
