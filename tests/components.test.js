import { decompose, charactersWithComponent } from '../index';

test('decompose', () => {
	console.log(JSON.stringify(decompose('面'), null, 4));
});

test('charactersWithComponent', () => {
	console.log(charactersWithComponent('囗'));
});
