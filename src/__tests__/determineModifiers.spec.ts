/**
 * @jest-environment node
 */

import { determineModifiers } from '../helpers';

const modifiers = { BoldMod: true, italicsMod: true, UnderlineMod: false };
const emptyModifiers = { MyMod: false };
const conditionals = { 'strikethrough-mod': true, 'whatever-mod': false };
const emptyConditionals = { AnotherMod: false, YetAnotherMod: false };
const block = 'test-block';
const elem = 'test-element';

const results = (name: string) => [
  `${name}--bold-mod`,
  `${name}--italics-mod`,
  `${name}--strikethrough-mod`,
];

const testCases = [
  [
    block,
    undefined,
    { ...modifiers },
    { ...conditionals },
    results(block),
  ] as const,
  [block, elem, { ...modifiers }, { ...conditionals }, results(elem)] as const,
  ['nothing-block', undefined, emptyModifiers, emptyConditionals, []] as const,
];

it.each(testCases)(
  'with %p block, %p elem, %p modifiers, and %p conditionals, function should return %p ',
  (block, elem, modifiers, conditionals, results) => {
    // test first without element
    expect(determineModifiers(block, elem, modifiers, conditionals)).toEqual(
      results
    );
  }
);
