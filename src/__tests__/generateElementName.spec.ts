import { generateElementName } from '../helpers';

const cases = [
  ['test-block', 'MyElement', 'test-block__my-element'],
  ['test-block', ' Another Element ', 'test-block__another-element'],
  ['test-block', 'kebab-element', 'test-block__kebab-element'],
];

it.each(cases)(
  'should combine block %s and elem %s into class name %s',
  (block, elem, result) => {
    expect(generateElementName(block, elem)).toBe(result);
  }
);
