import { generateElementName } from '../helpers';

it('should add BEM element', () => {
	expect(generateElementName('test-block', 'MyElement')).toBe('test-block__my-element');
});

it('should trim incoming element string', () => {
	expect(generateElementName('test-block', ' Another Element ')).toBe('test-block__another-element');
});

it('should preserve kebab casing if element already has kebab casing', () => {
	expect(generateElementName('test-block', 'kebab-element')).toBe('test-block__kebab-element');
});
