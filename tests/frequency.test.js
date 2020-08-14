import biangbiang from '../index';

test('character frequency', () => {
	console.log(biangbiang.Frequency.characterFrequency('面'));
});

test('character frequency (bad)', () => {
	expect(() => {
		biangbiang.Frequency.characterFrequency('not a character');
	}).toThrow();
});

test('word frequency', () => {
	console.log(biangbiang.Frequency.wordFrequency('面条'));
});

test('word frequency (bad)', () => {
	console.log(biangbiang.Frequency.wordFrequency('not a word'));
});

test('sentence statistics', () => {
	console.log(biangbiang.Frequency.multiFrequency('我喜欢吃面条。'));
});
