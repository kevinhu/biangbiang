import { Frequency } from '../index';

test('character frequency', () => {
	console.log(Frequency.characterFrequency('面'));
});

test('character frequency (bad)', () => {
	expect(() => {
		Frequency.characterFrequency('not a character');
	}).toThrow();
});

test('word frequency', () => {
	console.log(Frequency.wordFrequency('面条'));
});

test('word frequency (bad)', () => {
	console.log(Frequency.wordFrequency('not a word'));
});

test('sentence statistics', () => {
	console.log(Frequency.multiFrequency('我喜欢吃面条。'));
});
