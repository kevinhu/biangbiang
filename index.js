import Dictionary from './src/dictionary';
import Frequency from './src/frequency';
import Components from './src/components';

const _ = {};
_.Dictionary = new Dictionary();
_.Components = new Components();
_.Frequency = new Frequency();

export const biangbiang = _;
export default biangbiang;
