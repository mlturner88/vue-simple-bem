import { generateBlockName } from '../helpers';

it('should convert name to kebab case', () => {
  expect(generateBlockName('MyTest')).toBe('my-test');
});

it('should trim incoming string', () => {
  expect(generateBlockName(' AnotherTest ')).toBe('another-test');
});

it('should return input if already in kebab casing', () => {
  expect(generateBlockName('do-nothing')).toBe('do-nothing');
});
