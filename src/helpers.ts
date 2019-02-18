import kebabCase from 'lodash.kebabcase';
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
  return Object.entries({ ...modifiers, ...conditions }).reduce(
    (mods: string[], [mod, active]) => {
      if (active) {
        // if mod is active
        mods.push(generateModifierName(block, elem, mod));
      }

      return mods;
    },
    []
  );
}

function generateModifierName(
  block: string,
  elem: string | undefined,
  name: string
): string {
  const mod = kebabCase(name.trim());
  return !elem ? `${block}--${mod}` : `${elem}--${mod}`;
}

function addCssClass(el: HTMLElement, className: string) {
  const classString = getElementClassString(el);

  if (!doesStringContainClass(classString, className)) {
    el.setAttribute('class', `${classString} ${className}`);
  }
}

export function addCssClasses(el: HTMLElement, classNames: string[]) {
  classNames.forEach(c => addCssClass(el, c));
}

function removeCssClass(el: HTMLElement, className: string) {
  const classString = getElementClassString(el);

  if (doesStringContainClass(classString, className)) {
    // ensure new CSS class string is a space separated list
    const newClass = classString
      .replace(className, '')
      .split(/\s/)
      .join(' ');
    el.setAttribute('class', newClass);
  }
}

export function removeCssClasses(el: HTMLElement, classNames: string[]) {
  classNames.forEach(c => removeCssClass(el, c));
}

function getElementClassString(el: HTMLElement): string {
  if (!el) return '';
  const classString = el.getAttribute('class');
  return !classString ? '' : classString;
}

function doesStringContainClass(
  classString: string | null,
  className: string
): boolean {
  if (!classString || !className) return false;
  return classString.indexOf(className) >= 0;
}

export function generateBemClasses(
  binding: DirectiveBinding,
  node: VNode
): [string, string | undefined, string[]] {
  let block = 'bem-block';
  let elem;

  if (node.context) {
    if (node.context.$options.name) {
      // if component name was given
      block = generateBlockName(node.context.$options.name);
    } else if (
      node.context.$vnode.componentOptions &&
      node.context.$vnode.componentOptions.tag
    ) {
      // if component name wasn't given and component tag is available
      block = generateBlockName(node.context.$vnode.componentOptions.tag);
    }
  }

  if (binding.arg) {
    elem = generateElementName(block, binding.arg);
  }

  const mods = determineModifiers(
    block,
    elem,
    binding.modifiers,
    binding.value
  );

  return [block, elem, mods];
}
