import { DirectiveOptions } from 'vue/types';
import { generateBemClasses, addCssClass, addCssClasses, determineModifiers, removeCssClasses } from './helpers';

export default <DirectiveOptions>{
	inserted(el, binding, node) {
		const [ block, elem, mods ] = generateBemClasses(binding, node);
		addCssClass(el, !elem ? block : elem);
		addCssClasses(el, mods);
	},

	update(el, binding, node) {
		if (JSON.stringify(binding.value) === JSON.stringify(binding.oldValue)) {
			// if the value hasn't changed then do nothing
			return;
		}

		const [ block, elem, mods ] = generateBemClasses(binding, node);
		const previousMods = determineModifiers(block, elem, binding.modifiers, binding.oldValue);
		const removedMods = previousMods.filter((m) => mods.indexOf(m) < 0);

		addCssClass(el, !elem ? block : elem);
		removeCssClasses(el, removedMods);
		addCssClasses(el, mods);
	}
};
