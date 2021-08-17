/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/vue';
import { Component, defineComponent, h, withDirectives } from 'vue';
import { bemDirective } from '../directive';

const basicCases: [string, Component, string[]][] = [
  [
    'v-bem only',
    defineComponent({
      name: 'empty-block',
      render: () => withDirectives(h('div'), [[bemDirective]]),
    }),
    ['empty-block'],
  ],
  [
    'v-bem with element argument',
    defineComponent({
      name: 'block-with-elem',
      render: () =>
        withDirectives(h('div'), [[bemDirective, undefined, 'elem']]),
    }),
    ['block-with-elem__elem'],
  ],
  [
    'v-bem with mods',
    defineComponent({
      name: 'block-with-mods',
      render: () =>
        withDirectives(h('div'), [
          [bemDirective, { SomeMod: true, AnotherMod: true }],
        ]),
    }),
    ['block-with-mods--some-mod', 'block-with-mods--another-mod'],
  ],
  [
    'v-bem with elem argument and mods',
    defineComponent({
      name: 'block-with-elem-and-mods',
      render: () =>
        withDirectives(h('div'), [
          [bemDirective, { SomeMod: true, AnotherMod: true }, 'elem'],
        ]),
    }),
    [
      'block-with-elem-and-mods__elem--some-mod',
      'block-with-elem-and-mods__elem--another-mod',
    ],
  ],
];

it.each(basicCases)(
  'should handle %s example correctly',
  (name, component, result) => {
    const ctx = render(component);
    expect(ctx.container.firstChild).toHaveClass(...result);
  }
);

it('should remove mods after update', async () => {
  const ctx = render(
    defineComponent({
      name: 'RemoveMyMods',
      props: {
        mods: {
          type: Object,
          default: () => ({ falseMod: true, goodMod: true }),
        },
      },
      render() {
        return withDirectives(h('div'), [[bemDirective, this.mods]]);
      },
    })
  );

  expect(ctx.container.firstChild).toHaveClass(
    'remove-my-mods--false-mod',
    'remove-my-mods--good-mod'
  );

  await ctx.rerender({
    mods: { falseMod: false, goodMod: true, newMod: true },
  });

  expect(ctx.container.firstChild).not.toHaveClass('remove-my-mods--false-mod');
  expect(ctx.container.firstChild).toHaveClass(
    'remove-my-mods--good-mod',
    'remove-my-mods--new-mod'
  );
});

it('should remove mods after update with element', async () => {
  const ctx = render(
    defineComponent({
      name: 'RemoveMyElemMods',
      props: {
        mods: {
          type: Object,
          default: () => ({ falseMod: true, goodMod: true }),
        },
      },
      render() {
        return withDirectives(h('div'), [[bemDirective, this.mods, 'el']]);
      },
    })
  );

  expect(ctx.container.firstChild).toHaveClass(
    'remove-my-elem-mods__el--false-mod',
    'remove-my-elem-mods__el--good-mod'
  );

  await ctx.rerender({
    mods: { falseMod: false, goodMod: true, newMod: true },
  });

  expect(ctx.container.firstChild).not.toHaveClass(
    'remove-my-elem-mods__el--false-mod'
  );
  expect(ctx.container.firstChild).toHaveClass(
    'remove-my-elem-mods__el--good-mod',
    'remove-my-elem-mods__el--new-mod'
  );
});

it('should add new mod after update', async () => {
  const ctx = render(
    defineComponent({
      name: 'AddNewMod',
      props: {
        mods: {
          type: Object,
          default: () => ({}),
        },
      },
      render() {
        return withDirectives(h('div'), [[bemDirective, this.mods]]);
      },
    })
  );

  expect(ctx.container.firstChild).toHaveClass('add-new-mod');

  await ctx.rerender({ mods: { newMod: true } });

  expect(ctx.container.firstChild).toHaveClass('add-new-mod--new-mod');
});

it('should add new mod after update with element', async () => {
  const ctx = render(
    defineComponent({
      name: 'AddNewMod',
      props: {
        mods: {
          type: Object,
          default: () => ({}),
        },
      },
      render() {
        return withDirectives(h('div'), [[bemDirective, this.mods, 'elly']]);
      },
    })
  );

  expect(ctx.container.firstChild).toHaveClass('add-new-mod__elly');

  await ctx.rerender({ mods: { newMod: true } });

  expect(ctx.container.firstChild).toHaveClass('add-new-mod__elly--new-mod');
});

it('should retain mods even after a mutation', async () => {
  const ctx = render(
    defineComponent({
      name: 'KeepMyMods',
      props: {
        addOtherClass: {
          type: Boolean,
          default: false,
        },
      },
      render() {
        return withDirectives(
          h('div', { class: { 'some-class': this.addOtherClass } }, []),
          [[bemDirective, { newMod: true }]]
        );
      },
    })
  );

  expect(ctx.container.firstChild).toHaveClass('keep-my-mods');
  await ctx.rerender({ addOtherClass: true });
  expect(ctx.container.firstChild).toHaveClass('keep-my-mods', 'some-class');
});
