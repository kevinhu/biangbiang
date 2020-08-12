// sources:

// BCC_LEX_Zh: http://bcc.blcu.edu.cn/downloads/resources/BCC_LEX_Zh.zip
// CEDICT: https://www.mdbg.net/chinese/dictionary?page=cedict
// CJK-decomp: https://github.com/amake/cjk-decomp

import { arrayToDict, splitFirst, invertMapping } from "./utils";
import { JSON_FORMAT, MIN_FREQ } from "../config";

import { wordFreqsRaw, dictionaryRaw, componentsRaw } from "../config";

import {
	wordFreqsFile,
	charFreqsFile,
	simplifiedDictionaryFile,
	traditionalDictionaryFile,
	mergedDictionaryFile,
	charToWordsFile,
	simplifiedTraditionalFile,
	componentsFile,
	componentsToCharacterFile,
} from "../config";

var legacy = require("legacy-encoding");
var read = require("read-file");
var jsonfile = require("jsonfile");

const DATA_DIR = "../data";

/**
 * Handler for extracting word frequency estimates
 * @param {buffer} content
 * @return {Dictionary}
 */
function processWordFreqs(filename) {
	var content = read.sync(filename);

	var filestring = legacy.decode(content, "gb18030");
	var fileArray = filestring.split("\r\n");
	fileArray = fileArray.map((x) => x.split("\t"));
	fileArray = fileArray.map((x) => [x[0], parseInt(x[1])]);

	var wordFreqs = arrayToDict(fileArray);

	var filtered = Object.keys(wordFreqs).reduce(function(filtered, key) {
		if (wordFreqs[key] >= MIN_FREQ) filtered[key] = wordFreqs[key];
		return filtered;
	}, {});

	wordFreqs = filtered;

	var charFreqs = Object.keys(wordFreqs)
		.filter((key) => key.length == 1)
		.reduce((obj, key) => {
			obj[key] = wordFreqs[key];
			return obj;
		}, {});

	return [wordFreqs, charFreqs];
}

/**
 * Compute more detailed frequency information.
 * @param {Dictionary} freqDict
 * @return {Dictionary}
 */
function processFreqs(freqDict) {
	var totalFreq = Object.keys(freqDict).reduce(
		(sum, key) => sum + freqDict[key],
		0
	);

	var cumulativePercentage = 0.0;

	Object.keys(freqDict).map(function(key, index) {
		var freq = freqDict[key];
		var percentage = freq / totalFreq;

		cumulativePercentage = cumulativePercentage + percentage;

		// account for float rounding errors
		if (cumulativePercentage >= 1) {
			cumulativePercentage = 1;
		}

		freqDict[key] = {
			symbol: key,
			index: index,
			frequency: freq,
			percentage: percentage,
			cumulativePercentage: cumulativePercentage,
		};
	});

	return freqDict;
}

/**
 * Process a raw string row of CEDICT
 * @param {string} entry
 * @return {Array}
 */
function processDictionaryEntry(entry) {
	var entry = splitFirst(entry, " ", 2);

	var simplified = entry[0];
	var traditional = entry[1];

	var rest_split = splitFirst(entry[2], " /", 1);
	var pinyin = rest_split[0].slice(1, -1);
	var definition = rest_split[1].slice(0, -1);

	return [simplified, traditional, pinyin, definition];
}

/**
 * Handler for compiling simplified and traditional dictionaries
 * @param {buffer} content
 * @return {Array}
 */
function processDictionary(filename) {
	var content = read.sync(filename);

	var filestring = legacy.decode(content, "utf-8");

	var fileArray = filestring.split("\r\n");

	// skip the header
	fileArray = fileArray.slice(31);

	fileArray = fileArray.map((x) => processDictionaryEntry(x));

	// split by simplified-traditional
	var simplifiedDictionary = fileArray.map((x) => [
		x[0],
		{ simplified: x[0], traditional: x[1], pinyin: x[2], definition: x[3] },
	]);
	var traditionalDictionary = fileArray.map((x) => [
		x[1],
		{ simplified: x[0], traditional: x[1], pinyin: x[2], definition: x[3] },
	]);

	simplifiedDictionary = arrayToDict(simplifiedDictionary);
	traditionalDictionary = arrayToDict(traditionalDictionary);

	return [simplifiedDictionary, traditionalDictionary];
}

function makeCharToWords(words) {
	var charToWords = {};

	for (const word of words) {
		var wordChars = Array.from(new Set(word));
		for (const char of wordChars) {
			if (char in charToWords) {
				charToWords[char].push(word);
			} else {
				charToWords[char] = [word];
			}
		}
	}

	return charToWords;
}

/**
 * Construct a map specifying whether a character
 * is simplified, traditional, or both.
 * @param {Array} simplified
 * @param {Array} traditional
 * @return {Dictionary}
 */
function makeSimplifiedTraditional(simplifiedDictionary) {
	var simplifiedTraditional = {};

	// 1 if character is simplified,
	// 2 if character is traditional
	// 3 if character is both

	Object.keys(simplifiedDictionary).forEach((simplifiedWord) => {
		var traditionalWord =
			simplifiedDictionary[simplifiedWord]["traditional"];

		if (simplifiedWord.length === 1 && traditionalWord.length === 1) {
			if (simplifiedWord === traditionalWord) {
				simplifiedTraditional[simplifiedWord] = {
					type: 3,
					other: simplifiedWord,
				};
			} else {
				simplifiedTraditional[simplifiedWord] = {
					type: 1,
					other: traditionalWord,
				};
				simplifiedTraditional[traditionalWord] = {
					type: 2,
					other: simplifiedWord,
				};
			}
		}
	});

	return simplifiedTraditional;
}

/**
 * Parse array of components into a string
 * @param {string} componentsString
 * @return {Array}
 */
function componentsToArray(componentsString) {
	var componentsString = splitFirst(componentsString, "(", 2)[1];

	componentsString = componentsString.slice(0, -1);
	componentsString = componentsString.split(",");

	return componentsString;
}

/**
 * Handler for processing CJKdecomp components
 * @param {buffer} content
 * @return {Dictionary}
 */
function processComponents(filename) {
	var content = read.sync(filename);

	var fileString = legacy.decode(content, "utf-8");

	var fileArray = fileString.split("\n");

	// ignore last newline
	fileArray = fileArray.slice(0, -1);

	fileArray = fileArray.map((x) => splitFirst(x, ":", 1));

	// prepare array for conversion to dictionary
	fileArray = fileArray.map((x) => [x[0], componentsToArray(x[1])]);
	var componentsDictionary = arrayToDict(fileArray);

	return componentsDictionary;
}

/**
 * Wrapper for exporting an object to JSON.
 * @param {String} path
 * @param {Object} obj
 */
function toJSON(path, obj) {
	jsonfile.writeFile(path, obj, JSON_FORMAT, function(err) {
		if (err) console.error(err);
	});
}

// process word frequencies
console.log("Processing word frequencies");
var [wordFreqs, charFreqs] = processWordFreqs(`${DATA_DIR}/${wordFreqsRaw}`);

wordFreqs = processFreqs(wordFreqs);
toJSON(`${DATA_DIR}/${wordFreqsFile}`, wordFreqs);
console.log("\tMade word frequency map");

charFreqs = processFreqs(charFreqs);
toJSON(`${DATA_DIR}/${charFreqsFile}`, charFreqs);
console.log("\tMade character frequency map");

// process dictionaries
console.log("Processing dictionaries");
var [simplifiedDictionary, traditionalDictionary] = processDictionary(
	`${DATA_DIR}/${dictionaryRaw}`
);

var mergedDictionary = Object.assign(
	{},
	simplifiedDictionary,
	traditionalDictionary
);

toJSON(`${DATA_DIR}/${simplifiedDictionaryFile}`, simplifiedDictionary);
console.log("\tMade simplified dictionary");
toJSON(`${DATA_DIR}/${traditionalDictionaryFile}`, traditionalDictionary);
console.log("\tMade traditional dictionary");
toJSON(`${DATA_DIR}/${mergedDictionaryFile}`, mergedDictionary);
console.log("\tMade merged dictionary");

// characters to words mapping
var charToWords = makeCharToWords(Object.keys(mergedDictionary));
toJSON(`${DATA_DIR}/${charToWordsFile}`, charToWords);
console.log("\tMade character -> word map");

// simplified or traditional map
var simplifiedTraditional = makeSimplifiedTraditional(simplifiedDictionary);
toJSON(`${DATA_DIR}/${simplifiedTraditionalFile}`, simplifiedTraditional);
console.log("\tMade simplified/traditional map");

// process character components
console.log("Processing character components");
var components = processComponents(`${DATA_DIR}/${componentsRaw}`);
toJSON(`${DATA_DIR}/${componentsFile}`, components);
console.log("\tMade character to components map");

var componentsToCharacter = invertMapping(components);
toJSON(`${DATA_DIR}/${componentsToCharacterFile}`, componentsToCharacter);
console.log("\tMade component to characters map");
