const wordFreqs = require("../data/processed/wordFreqs.json");
const charFreqs = require("../data/processed/charFreqs.json");

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

export function multiFrequency(sentence) {
	var charFrequencies = [...sentence].map((char, index) =>
		characterFrequency(char)
	);

	return charFrequencies;
}
