import { SimpleBemElement } from './types';
import { addCssClasses } from './helpers';

export const mutationConfig: MutationObserverInit = {
  attributeFilter: ['class'],
  attributes: true
};

export function createMutationObserver(el: SimpleBemElement): MutationObserver {
  const observer = new MutationObserver(mutationCallback);
  observer.observe(el, mutationConfig);
  return observer;
}

function mutationCallback(mutationList: MutationRecord[]) {
  mutationList.forEach(({ type, target }) => {
    if (type !== 'attributes') return;
    const {
      __$simpleBemBlock__,
      __$simpleBemElement__,
      __$simpleBemMods__
    }: SimpleBemElement = target as any;

    // ensure all of the proper CSS classes are present
    addCssClasses(target as HTMLElement, [
      !__$simpleBemElement__ ? __$simpleBemBlock__ : __$simpleBemElement__,
      ...__$simpleBemMods__
    ]);
  });
}
