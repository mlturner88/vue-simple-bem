import Vue from 'vue';
import { generateBemClasses } from '../helpers';

const baseBinding = { modifiers: {}, name: 'bem' };
const baseNode = { isRootInsert: true, isComment: false };
const baseContext = new Vue();

it('should use default block if none was found', () => {
  const [block] = generateBemClasses(baseBinding, baseNode);

  expect(block).toBe('bem-block');
});

it('should use name for block', () => {
  const [block] = generateBemClasses(baseBinding, {
    ...baseNode,
    context: { ...baseContext, $options: { name: 'MyName' } }
  });

  expect(block).toBe('my-name');
});

it('should use binding argument for element', () => {
  const [, element] = generateBemClasses(
    { ...baseBinding, arg: 'MyElem' },
    baseNode
  );

  expect(element).toBe('bem-block__my-elem');
});

it('should use binding modifiers for mods', () => {
  const [, , mods] = generateBemClasses(
    { ...baseBinding, modifiers: { FirstMod: true, SecondMod: true } },
    baseNode
  );

  expect(mods.length).toBe(2);
  expect(mods).toContain('bem-block--first-mod');
  expect(mods).toContain('bem-block--second-mod');
});

it('should use binding value properties that are true for mods', () => {
  const [, , mods] = generateBemClasses(
    {
      ...baseBinding,
      value: { FirstMod: true, SecondMod: true, BogusMod: false }
    },
    baseNode
  );

  expect(mods.length).toBe(2);
  expect(mods).toContain('bem-block--first-mod');
  expect(mods).toContain('bem-block--second-mod');
});

it('should use both binding modifiers and value properties that are true for mods', () => {
  const [, , mods] = generateBemClasses(
    {
      ...baseBinding,
      modifiers: { FirstMod: true, SecondMod: true },
      value: { AnotherMod: true, BogusMod: false }
    },
    baseNode
  );

  expect(mods.length).toBe(3);
  expect(mods).toContain('bem-block--first-mod');
  expect(mods).toContain('bem-block--second-mod');
  expect(mods).toContain('bem-block--another-mod');
});

it('should use binding modifiers for mods with element', () => {
  const [, , mods] = generateBemClasses(
    {
      ...baseBinding,
      modifiers: { FirstMod: true, SecondMod: true },
      arg: 'MyElem'
    },
    baseNode
  );

  expect(mods.length).toBe(2);
  expect(mods).toContain('bem-block__my-elem--first-mod');
  expect(mods).toContain('bem-block__my-elem--second-mod');
});

it('should use binding value properties that are true for mods with element', () => {
  const [, , mods] = generateBemClasses(
    {
      ...baseBinding,
      value: { FirstMod: true, SecondMod: true, BogusMod: false },
      arg: 'MyElem'
    },
    baseNode
  );

  expect(mods.length).toBe(2);
  expect(mods).toContain('bem-block__my-elem--first-mod');
  expect(mods).toContain('bem-block__my-elem--second-mod');
});

it('should use both binding modifiers and value properties that are true for mods with element', () => {
  const [, , mods] = generateBemClasses(
    {
      ...baseBinding,
      modifiers: { FirstMod: true, SecondMod: true },
      value: { AnotherMod: true, BogusMod: false },
      arg: 'MyElem'
    },
    baseNode
  );

  expect(mods.length).toBe(3);
  expect(mods).toContain('bem-block__my-elem--first-mod');
  expect(mods).toContain('bem-block__my-elem--second-mod');
  expect(mods).toContain('bem-block__my-elem--another-mod');
});
