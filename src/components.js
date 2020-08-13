import { arrayToDict } from "./utils";

const components = require("../data/processed/components.json");
const componentsToCharacter = require("../data/processed/componentsToCharacter.json");

export function decompose(character, depth) {
	if (!character in components) {
		return { [character]: character };
	}

	var decomposition = components[character];

	if (decomposition.length === 1 || depth === 0) {
		if (decomposition[0] === "") {
			return character;
		}
		return { [character]: decomposition[0] };
	}

	decomposition = decomposition.map((x) => [x, decompose(x, depth - 1)]);
	decomposition = arrayToDict(decomposition);

	return decomposition;
}

export function charactersWithComponent(component) {
	if (character in componentsToCharacter) {
		return componentsToCharacter[component];
	} else {
		return [];
	}
}
