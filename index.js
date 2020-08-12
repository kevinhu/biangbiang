// TODO:
// sentence-level statistics
// component to characters

import {arrayToDict} from "./utils";

const wordFreqs = require("./data/processed/wordFreqs.json");
const charFreqs = require("./data/processed/charFreqs.json");

const simplifiedDictionary = require("./data/processed/simplifiedDictionary.json");
const traditionalDictionary = require("./data/processed/traditionalDictionary.json");
const mergedDictionary = require("./data/processed/mergedDictionary.json");

const charToWords = require("./data/processed/charToWords.json");

const simplifiedTraditional = require("./data/processed/simplifiedTraditional.json");

const components = require("./data/processed/components.json");

function define(word, dictionary) {
	switch (dictionary) {
		case "simplified":
			return simplifiedDictionary[word];

		case "traditional":
			return traditionalDictionary[word];

		case "merged":
			return mergedDictionary[word];

		default:
			throw "Dictionary must be 'simplified', 'traditional', or 'merged'";
	}
}

function decompose(character, depth) {
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
	return charFreqs[character];
}

function wordFrequency(word) {
	return wordFreqs[word];
}

function wordsContaining(character) {
	return charToWords[character];
}

function kind(character) {
	return simplifiedTraditional[character];
}

// console.log(define("88", "merged"))
console.log(define("88", "merged"));
console.log(JSON.stringify(decompose("斬"), null, 2));
console.log(characterFrequency("斩"));
console.log(wordFrequency("斩"));
console.log(wordsContaining("斬"));
console.log(kind("斬"));
console.log(kind("斩"));


