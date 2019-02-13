import { DirectiveOptions } from 'vue/types';
import {
  addCssClasses,
  determineModifiers,
  generateBemClasses,
  removeCssClasses
} from './helpers';

export default {
  inserted(el, binding, node) {
    const [block, elem, mods] = generateBemClasses(binding, node);
    addCssClasses(el, [!elem ? block : elem, ...mods]);
  },

  update(el, binding, node) {
    if (JSON.stringify(binding.value) === JSON.stringify(binding.oldValue)) {
      // if the value hasn't changed then do nothing
      return;
    }

    const [block, elem, mods] = generateBemClasses(binding, node);
    const previousMods = determineModifiers(
      block,
      elem,
      binding.modifiers,
      binding.oldValue
    );

    const removedMods = previousMods.filter(m => mods.indexOf(m) < 0);
    removeCssClasses(el, removedMods);
    addCssClasses(el, [!elem ? block : elem, ...mods]);
  }
} as DirectiveOptions;
