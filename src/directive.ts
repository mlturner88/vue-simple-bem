import { Directive } from 'vue';
import {
  addCssClasses,
  determineModifiers,
  generateBemClasses,
  removeCssClasses,
} from './helpers';
import { SimpleBemElement } from './types';

export const bemDirective: Directive = {
  mounted(el, binding, node) {
    const [block, elem, mods] = generateBemClasses(binding, node);
    addCssClasses(el, [elem ?? block, ...mods]);
    assignBemAttributes(el, block, elem, mods);
  },

  updated(el, binding, node) {
    const { value, oldValue, modifiers } = binding;
    const bindingHasChanged =
      JSON.stringify(value) !== JSON.stringify(oldValue);
    const classHasChanged = (el.__$lastClasses__ ?? null) !== el.className;
    if (!(bindingHasChanged || classHasChanged)) {
      // if the value hasn't changed then do nothing
      return;
    }

    const [block, elem, mods] = generateBemClasses(binding, node);
    assignBemAttributes(el, block, elem, mods);

    const previousMods = determineModifiers(block, elem, modifiers, oldValue);
    const removedMods = previousMods.filter((m) => !mods.includes(m));
    removeCssClasses(el, removedMods);
    addCssClasses(el, [elem ?? block, ...mods]);
  },
};

function assignBemAttributes(
  el: SimpleBemElement,
  block: string,
  elem: string | undefined,
  mods: string[]
) {
  el.__$simpleBemBlock__ = block;
  el.__$simpleBemElement__ = elem;
  el.__$simpleBemMods__ = mods;
  el.__$lastClasses__ = el.className;
}
