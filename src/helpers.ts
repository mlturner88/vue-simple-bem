import kebabCase from 'lodash.kebabcase';
import words from 'lodash.words';
import { DirectiveBinding } from 'vue/types/options';
import { VNode } from 'vue/types';

export function generateBlockName(name: string): string {
	return kebabCase(name.trim());
}

export function generateElementName(block: string, name: string): string {
	return `${block}__${kebabCase(name.trim())}`;
}

export function determineModifiers(
	block: string,
	elem: string | undefined,
	modifiers: { [key: string]: boolean },
	conditions: { [key: string]: boolean }
): string[] {
	return Object.entries({ ...modifiers, ...conditions }).reduce((mods: string[], [ mod, active ]) => {
		if (active) {
			// if mod is active
			mods.push(generateModifierName(block, elem, mod));
		}

		return mods;
	}, []);
}

function generateModifierName(block: string, elem: string | undefined, name: string): string {
	const mod = kebabCase(name.trim());
	return !elem ? `${block}--${mod}` : `${elem}--${mod}`;
}

export function addCssClass(el: HTMLElement, className: string) {
	if (el.classList && !el.classList.contains(className)) {
		el.classList.add(className);
	} else if (!el.classList) {
		// in some cases, IE11 does not support classList (on <svg> elements, for example)
		// so add a contengincy case here
		const classString = el.getAttribute('class');
		if (classString && classString.indexOf(className) === -1) {
			el.setAttribute('class', `${classString} ${className}`);
		}
	}
}

export function addCssClasses(el: HTMLElement, classNames: string[]) {
	classNames.forEach((c) => addCssClass(el, c));
}

function removeCssClass(el: HTMLElement, className: string) {
	if (el.classList && el.classList.contains(className)) {
		el.classList.remove(className);
	} else if (!el.classList) {
		// in some cases, IE11 does not support classList (on <svg> elements, for example)
		// so add a contengincy case here
		const classString = el.getAttribute('class');

		if (classString && classString.indexOf(className) !== -1) {
			classString.replace(className, '');

			// after replacing the removed class with an empty string, break the class string
			// into words and rejoin with a single space to ensure the class attribute is still
			// a single space dilineated list
			const newClass = words(classString).join(' ');
			el.setAttribute('class', newClass);
		}
	}
}

export function removeCssClasses(el: HTMLElement, classNames: string[]) {
	classNames.forEach((c) => removeCssClass(el, c));
}

export function generateBemClasses(binding: DirectiveBinding, node: VNode): [string, string | undefined, string[]] {
	let block = 'bem-block';
	let elem;

	if (node.context && node.context.$options.name) {
		block = generateBlockName(node.context.$options.name);
	}

	if (binding.arg) {
		elem = generateElementName(block, binding.arg);
	}

	const mods = determineModifiers(block, elem, binding.modifiers, binding.value);

	return [ block, elem, mods ];
}
