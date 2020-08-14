import { Components } from '../index';

test('decompose', () => {
	console.log(JSON.stringify(Components.decompose('面'), null, 4));
});

test('charactersWithComponent', () => {
	console.log(Components.charactersWithComponent('囗'));
});
