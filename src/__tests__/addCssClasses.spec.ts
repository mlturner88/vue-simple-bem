import { JSDOM } from 'jsdom';
import { addCssClasses } from '../helpers';

let el: HTMLElement | null = null;

beforeEach(() => {
  const { window } = new JSDOM('<div class="some-class">Some Text</div>');
  el = window.document.querySelector('div');
});

/*********************************************************************
 *  All of these tests check 'el' for truthy to make typescript happy *
 **********************************************************************/

it('should add classes if it was not already present', () => {
  if (el) {
    addCssClasses(el, ['a-class', 'another-class', 'some-class']);

    expect(el.classList).toContain('a-class');
    expect(el.classList).toContain('another-class');
    // should not have duplicate classes
    expect(el.classList.length).toBe(3);
  } else {
    expect(el).toBeTruthy();
  }
});

it('should do nothing if no classes received', () => {
  if (el) {
    addCssClasses(el, []);

    expect(el.classList.length).toBe(1);
  } else {
    expect(el).toBeTruthy();
  }
});

it('should do nothing if all classes are already on element', () => {
  if (el) {
    addCssClasses(el, ['some-class']);

    expect(el.classList.length).toBe(1);
  } else {
    expect(el).toBeTruthy();
  }
});
