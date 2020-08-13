import { define, characterFrequency, multiFrequency } from '../index';

test('define', () => {
	define('鱼', 'simplified');
});

test('frequency', () => {
	console.log(characterFrequency('鱼'));
});

test('frequency', () => {
	expect(() => {
		characterFrequency('not a character');
	}).toThrow();
});

test('sentence statistics', () => {
	console.log(multiFrequency('我喜欢吃西红柿鸡蛋炒米饭。'));
});
