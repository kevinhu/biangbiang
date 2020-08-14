import biangbiang from '../index';

test('decompose', () => {
	console.log(JSON.stringify(biangbiang.Components.decompose('面'), null, 4));
});

test('charactersWithComponent', () => {
	console.log(biangbiang.Components.charactersWithComponent('囗'));
});
