import { JSDOM } from 'jsdom';
import directive from '../directive';

let el: HTMLElement | null = null;
const baseBinding = { modifiers: {}, name: 'bem' };
const baseNode = { isRootInsert: true, isComment: false };

beforeEach(() => {
  const { window } = new JSDOM('<div class="some-class">Some Text</div>');
  el = window.document.querySelector('div');
});

/*********************************************************************
 *  All of these tests check 'el' for truthy to make typescript happy *
 **********************************************************************/

it('should add block to element upon insertion', () => {
  if (el && directive.inserted) {
    directive.inserted(el, baseBinding, baseNode, baseNode);

    expect(el.classList).toContain('bem-block');
  } else {
    expect(el).toBeTruthy();
  }
});

it('should add element to element upon insertion', () => {
  if (el && directive.inserted) {
    directive.inserted(
      el,
      { ...baseBinding, arg: 'AnElem' },
      baseNode,
      baseNode
    );

    expect(el.classList).toContain('bem-block__an-elem');
  } else {
    expect(el).toBeTruthy();
  }
});

it('should add block mods to element upon insertion', () => {
  if (el && directive.inserted) {
    directive.inserted(
      el,
      { ...baseBinding, modifiers: { SomeMod: true, AnotherMod: true } },
      baseNode,
      baseNode
    );

    expect(el.classList).toContain('bem-block');
    expect(el.classList).toContain('bem-block--some-mod');
    expect(el.classList).toContain('bem-block--another-mod');
  } else {
    expect(el).toBeTruthy();
  }
});

it('should add element mods to element upon insertion', () => {
  if (el && directive.inserted) {
    directive.inserted(
      el,
      {
        ...baseBinding,
        modifiers: { SomeMod: true, AnotherMod: true },
        arg: 'MyElem'
      },
      baseNode,
      baseNode
    );

    expect(el.classList).toContain('bem-block__my-elem');
    expect(el.classList).toContain('bem-block__my-elem--some-mod');
    expect(el.classList).toContain('bem-block__my-elem--another-mod');
  } else {
    expect(el).toBeTruthy();
  }
});

it('should remove mods after update', () => {
  if (el && directive.update) {
    el.classList.add('bem-block');
    el.classList.add('bem-block--false-mod');
    el.classList.add('bem-block--good-mod');
    directive.update(
      el,
      {
        ...baseBinding,
        value: { FalseMod: false, GoodMod: true, NewMod: true },
        oldValue: { FalseMod: true, GoodMod: true }
      },
      baseNode,
      baseNode
    );

    expect(el.classList).toContain('bem-block');
    expect(el.classList).not.toContain('bem-block--false-mod');
    expect(el.classList).toContain('bem-block--good-mod');
    expect(el.classList).toContain('bem-block--new-mod');
  } else {
    expect(el).toBeTruthy();
  }
});

it('should remove mods after update with element', () => {
  if (el && directive.update) {
    el.classList.add('bem-block__my-elem');
    el.classList.add('bem-block__my-elem--false-mod');
    el.classList.add('bem-block__my-elem--good-mod');
    directive.update(
      el,
      {
        ...baseBinding,
        value: { FalseMod: false, GoodMod: true, NewMod: true },
        oldValue: { FalseMod: true, GoodMod: true },
        arg: 'MyElem'
      },
      baseNode,
      baseNode
    );

    expect(el.classList).toContain('bem-block__my-elem');
    expect(el.classList).not.toContain('bem-block__my-elem--false-mod');
    expect(el.classList).toContain('bem-block__my-elem--good-mod');
    expect(el.classList).toContain('bem-block__my-elem--new-mod');
  } else {
    expect(el).toBeTruthy();
  }
});

it('should add new mod after update', () => {
  if (el && directive.update) {
    el.classList.add('bem-block');
    directive.update(
      el,
      {
        ...baseBinding,
        value: { NewMod: true },
        oldValue: {}
      },
      baseNode,
      baseNode
    );

    expect(el.classList).toContain('bem-block');
    expect(el.classList).toContain('bem-block--new-mod');
  } else {
    expect(el).toBeTruthy();
  }
});

it('should add new mod after update with element', () => {
  if (el && directive.update) {
    el.classList.add('bem-block__my-elem');
    directive.update(
      el,
      {
        ...baseBinding,
        value: { NewMod: true },
        oldValue: {},
        arg: 'MyElem'
      },
      baseNode,
      baseNode
    );

    expect(el.classList).toContain('bem-block__my-elem');
    expect(el.classList).toContain('bem-block__my-elem--new-mod');
  } else {
    expect(el).toBeTruthy();
  }
});
