import { determineModifiers } from '../helpers';

it('should create BEM mod classes for truthy conditionals', () => {
  // test first without element
  expect(
    determineModifiers(
      'test-block',
      undefined,
      { BoldMod: true, ItalicsMod: true, UnderlineMod: false },
      { StrikethroughMod: true, WhateverMod: false }
    )
  ).toEqual([
    'test-block--bold-mod',
    'test-block--italics-mod',
    'test-block--strikethrough-mod'
  ]);

  // test next with element
  expect(
    determineModifiers(
      'test-block',
      'test-element',
      { BoldMod: true, ItalicsMod: true, UnderlineMod: false },
      { StrikethroughMod: true, WhateverMod: false }
    )
  ).toEqual([
    'test-element--bold-mod',
    'test-element--italics-mod',
    'test-element--strikethrough-mod'
  ]);
});

it('should return empty array if no mods are truthy', () => {
  expect(
    determineModifiers(
      'nothing-block',
      undefined,
      { MyMod: false },
      { AnotherMod: false, YetAnotherMod: false }
    )
  ).toEqual([]);
});
