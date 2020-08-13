const simplifiedDictionary = require("../data/processed/simplifiedDictionary.json");
const traditionalDictionary = require("../data/processed/traditionalDictionary.json");
const mergedDictionary = require("../data/processed/mergedDictionary.json");

const charToWords = require("../data/processed/charToWords.json");

const simplifiedTraditional = require("../data/processed/simplifiedTraditional.json");

export function define(word, dictionary) {
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

export function kind(character) {
	if (character in simplifiedTraditional) {
		return simplifiedTraditional[character];
	} else {
		return {
			type: -1,
			other: "",
		};
	}
}

export function wordsContaining(character) {
	if (character in charToWords) {
		return charToWords[character];
	} else {
		return [];
	}
}