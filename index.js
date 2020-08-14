import Dictionary from './src/dictionary'
import Frequency from './src/frequency'
import Components from './src/components'

let biangbiang = {}
biangbiang.Dictionary = new Dictionary();
biangbiang.Components = new Components();
biangbiang.Frequency = new Frequency();

module.exports = biangbiang

console.log(biangbiang.Dictionary.define('88','simplified'))