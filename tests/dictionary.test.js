import { define, kind, wordsContaining } from '../index';

test('define', () => {
	console.log(define('鱼', 'simplified'));
});

test('kind', () => {
	console.log(kind('鱼'));
});

test('wordsContaining', () => {
	console.log(wordsContaining('鱼'));
});

