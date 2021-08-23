import type { ComponentPublicInstance, DirectiveBinding, VNode } from 'vue';

export function generateBlockName(name: string): string {
  return kebabCase(name);
}

export function generateElementName(block: string, name: string): string {
  return `${block}__${kebabCase(name)}`;
}

export function determineModifiers(
  block: string,
  elem: string | undefined,
  modifiers: { [key: string]: boolean },
  conditions: { [key: string]: boolean }
): string[] {
  return Object.entries({ ...modifiers, ...conditions })
    .filter(([, active]) => active)
    .map(([mod]) => `${elem ?? block}--${kebabCase(mod)}`);
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

const kebabRegex = /([A-Z])([^A-Z]*)/g;
function kebabCase(value: string): string {
  const cleaned = value.trim().split(' ').join('');
  const result = cleaned.replace(kebabRegex, (m, p1, p2) => {
    return `-${p1.toLowerCase()}${p2}`;
  });
  return result[0] === '-' ? result.slice(1) : result;
}
