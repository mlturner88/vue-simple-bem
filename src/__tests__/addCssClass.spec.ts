import { addCssClass } from '../helpers';

it('should add the class if it does not already exist', () => {
	const el = {
		classList: {
			contains: jest.fn(() => false),
			add: jest.fn()
		}
	};

	addCssClass(<any>el, 'MyClass');

	expect(el.classList.add).toHaveBeenCalledTimes(1);
	expect(el.classList.add).toHaveBeenCalledWith('MyClass');
});

it('should not add the class if it does already exist', () => {
	const el = {
		classList: {
			contains: jest.fn(() => true),
			add: jest.fn()
		}
	};

	addCssClass(<any>el, 'SomeClass');

	expect(el.classList.add).toHaveBeenCalledTimes(0);
	expect(el.classList.add).not.toHaveBeenCalledWith('SomeClass');
});

it('should fallback to old API if unable to use classList to add class if it does not already exist', () => {
	const el = {
		getAttribute: jest.fn(() => 'SomeClass'),
		setAttribute: jest.fn()
	};

	addCssClass(<any>el, 'TestClass');

	expect(el.setAttribute).toHaveBeenCalledTimes(1);
	expect(el.setAttribute).toHaveBeenCalledWith('class', 'SomeClass TestClass');
});

it('should fallback to old API if unable to use classList to not add class if it already exists', () => {
	const el = {
		getAttribute: jest.fn(() => 'SomeClass'),
		setAttribute: jest.fn()
	};

	addCssClass(<any>el, 'SomeClass');

	expect(el.getAttribute).toHaveBeenCalledTimes(1);
	expect(el.setAttribute).toHaveBeenCalledTimes(0);
});
