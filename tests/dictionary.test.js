import { define, kind, wordsContaining } from '../index';

test('define', () => {
	console.log(define('面条', 'simplified'));
});

test('kind', () => {
	console.log(kind('面'));
});

test('wordsContaining', () => {
	console.log(wordsContaining('面'));
});

