import type { ComponentPublicInstance, DirectiveBinding, VNode } from 'vue';
import kebabCase from 'kebab-case';

export function generateBlockName(name: string): string {
  return cleanKebab(name);
}

export function generateElementName(block: string, name: string): string {
  return `${block}__${cleanKebab(name)}`;
}

export function determineModifiers(
  block: string,
  elem: string | undefined,
  modifiers: { [key: string]: boolean },
  conditions: { [key: string]: boolean }
): string[] {
  return Object.entries({ ...modifiers, ...conditions })
    .filter(([, active]) => active)
    .map(([mod]) => `${elem ?? block}--${cleanKebab(mod)}`);
}

export function addCssClasses(el: HTMLElement, classNames: string[]): void {
  el.classList.add(...classNames);
}

export function removeCssClasses(el: HTMLElement, classNames: string[]): void {
  el.classList.remove(...classNames);
}

export function generateBemClasses(
  { instance, modifiers, value, arg }: DirectiveBinding,
  node: VNode
): [string, string | undefined, string[]] {
  const { selfBlock, id } = getBlockInfo(arg, instance, node);

  const block = generateBlockName(id);
  const elem = !selfBlock && arg ? generateElementName(block, arg) : undefined;
  const mods = determineModifiers(block, elem, modifiers, value);

  return [block, elem, mods];
}

type BlockInfo = { selfBlock: boolean; id: string };
function getBlockInfo(
  arg: string | undefined,
  instance: ComponentPublicInstance | null,
  node: VNode
): BlockInfo {
  if (arg === 'self' && node.component?.proxy) {
    return {
      selfBlock: true,
      id: getBlockId(node.component.proxy),
    };
  } else if (instance?.$options.name) {
    return {
      selfBlock: false,
      id: getBlockId(instance),
    };
  } else return { selfBlock: false, id: 'bem-block' };
}

function getBlockId({ $options, $el }: ComponentPublicInstance) {
  const { uid, name } = $options;
  const { tagName } = $el ?? {};
  const blockId = name ?? uid ?? tagName;

  return blockId ? generateBlockName(blockId.toString()) : 'bem-block';
}

function cleanKebab(value: string): string {
  const result = kebabCase(value.trim().split(' ').join(''));
  if (result[0] === '-') return result.slice(1);
  else return result;
}
