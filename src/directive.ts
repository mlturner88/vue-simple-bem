import { DirectiveOptions } from 'vue/types';
import {
  addCssClasses,
  determineModifiers,
  generateBemClasses,
  removeCssClasses
} from './helpers';
import { SimpleBemElement } from './types';
import { hookUpMutationObserver } from './mutationObserver';

export const bemDirective = {
  inserted(el, binding, node) {
    const [block, elem, mods] = generateBemClasses(binding, node);
    const bemElement: SimpleBemElement = el as any;
    addCssClasses(bemElement, [!elem ? block : elem, ...mods]);
    bemElement.__$simpleBemBlock__ = block;
    bemElement.__$simpleBemElement__ = elem;
    bemElement.__$simpleBemMods__ = mods;
    hookUpMutationObserver(bemElement);
  },

  update(el, binding, node) {
    if (JSON.stringify(binding.value) === JSON.stringify(binding.oldValue)) {
      // if the value hasn't changed then do nothing
      return;
    }

    const [block, elem, mods] = generateBemClasses(binding, node);

    const bemElement: SimpleBemElement = el as any;
    bemElement.__$simpleBemBlock__ = block;
    bemElement.__$simpleBemElement__ = elem;
    bemElement.__$simpleBemMods__ = mods;

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
