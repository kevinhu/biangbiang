import biangbiang from '../index';

test('define', () => {
	console.log(biangbiang.Dictionary.define('面条', 'simplified'));
});

test('kind', () => {
	console.log(biangbiang.Dictionary.kind('面'));
});

test('wordsContaining', () => {
	console.log(biangbiang.Dictionary.wordsContaining('面'));
});

