import { Dictionary } from '../index';

test('define', () => {
	console.log(Dictionary.define('面条', 'simplified'));
});

test('kind', () => {
	console.log(Dictionary.kind('面'));
});

test('wordsContaining', () => {
	console.log(Dictionary.wordsContaining('面'));
});

