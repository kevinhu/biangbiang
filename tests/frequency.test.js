import { characterFrequency, wordFrequency, multiFrequency } from '../index';

test('character frequency', () => {
	console.log(characterFrequency('面'));
});

test('character frequency (bad)', () => {
	expect(() => {
		characterFrequency('not a character');
	}).toThrow();
});

test('word frequency', () => {
	console.log(wordFrequency('面条'));
});

test('word frequency (bad)', () => {
	console.log(wordFrequency('not a word'));
});

test('sentence statistics', () => {
	console.log(multiFrequency('我喜欢吃面条。'));
});
