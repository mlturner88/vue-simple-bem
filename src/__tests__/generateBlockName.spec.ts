import { generateBlockName } from '../helpers';

const testCases = [
  ['MyTest', 'my-test'],
  [' AnotherTest ', 'another-test'],
  ['do-nothing', 'do-nothing'],
];

it.each(testCases)('generates block name %s from input %s', (input, result) => {
  expect(generateBlockName(input)).toBe(result);
});
