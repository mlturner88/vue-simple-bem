import { JSDOM } from 'jsdom';
import { removeCssClasses } from '../helpers';

let el: HTMLElement | null = null;

beforeEach(() => {
  const { window } = new JSDOM('<div class="some-class remove-me and-me">Some Text</div>');
  el = window.document.querySelector('div');
});

/*********************************************************************
*  All of these tests check 'el' for truthy to make typescript happy *
**********************************************************************/

it('should remove classes if present', () => {
  if (el) {
    removeCssClasses(el, ['a-class', 'remove-me', 'and-me']);

    expect(el.classList.length).toBe(1);
    expect(el.classList).toContain('some-class');
    expect(el.classList).not.toContain('remove-me');
    expect(el.classList).not.toContain('and-me');
  } else {
    expect(el).toBeTruthy();
  }
});

it('should do nothing if empty array received', () => {
  if (el) {
    removeCssClasses(el, []);

    expect(el.classList.length).toBe(3);
  } else {
    expect(el).toBeTruthy();
  }
});

it('should do nothing if element does not contain given classes', () => {
  if (el) {
    removeCssClasses(el, ['bogus-class', 'another-one']);

    expect(el.classList.length).toBe(3);
  } else {
    expect(el).toBeTruthy();
  }
});