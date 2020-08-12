// TODO:
// sentence-level statistics

import { arrayToDict } from "./src/utils";

const wordFreqs = require("./data/processed/wordFreqs.json");
const charFreqs = require("./data/processed/charFreqs.json");

const simplifiedDictionary = require("./data/processed/simplifiedDictionary.json");
const traditionalDictionary = require("./data/processed/traditionalDictionary.json");
const mergedDictionary = require("./data/processed/mergedDictionary.json");

const charToWords = require("./data/processed/charToWords.json");

const simplifiedTraditional = require("./data/processed/simplifiedTraditional.json");

const components = require("./data/processed/components.json");
const componentsToCharacter = require("./data/processed/componentsToCharacter.json");

function define(word, dictionary) {
	var dictionary;

	switch (dictionary) {
		case "simplified":
			dictionary = simplifiedDictionary;

			break;

		case "traditional":
			dictionary = traditionalDictionary;
			break;

		case "merged":
			dictionary = mergedDictionary;
			break;

		default:
			throw "Dictionary must be 'simplified', 'traditional', or 'merged'";
	}

	if (word in dictionary) {
		return dictionary[word];
	} else {
		return {
			simplified: -1,
			traditional: -1,
			pinyin: -1,
			definition: -1,
		};
	}
}

function decompose(character, depth) {
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

function characterFrequency(character) {
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

function wordFrequency(word) {
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

function wordsContaining(character) {
	if (character in charToWords) {
		return charToWords[character];
	} else {
		return [];
	}
}

function kind(character) {
	if (character in simplifiedTraditional) {
		return simplifiedTraditional[character];
	} else {
		return {
			type: -1,
			other: "",
		};
	}
}

function charactersWithComponent(component) {
	if (character in componentsToCharacter) {
		return componentsToCharacter[component];
	} else {
		return [];
	}
}

function multiFrequency(sentence) {
	var charFrequencies = [...sentence].map((char, index) =>
		characterFrequency(char)
	);

	return charFrequencies;
}

// console.log(define("88", "merged"))
console.log(define("88", "merged"));
console.log(JSON.stringify(decompose("斬"), null, 2));
console.log(characterFrequency("斩"));
console.log(wordFrequency("斩"));
console.log(wordsContaining("斬"));
console.log(kind("斬"));
console.log(kind("斩"));

console.log(charactersWithComponent("幵"));

console.log(
	multiFrequency(
		"北京的一个高层立法委员会做出的这一决定意味着，尽管四名民主派立法会议员已被禁止寻求连任，但他们很可能在延长了任期的香港立法会里保留他们的席位。"
	)
);
