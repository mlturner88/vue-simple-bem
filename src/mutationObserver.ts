import { SimpleBemElement } from './types';
import { addCssClasses } from './helpers';

const mutationConfig: MutationObserverInit = {
  attributeFilter: ['class'],
  attributes: true
};

const observer = new MutationObserver(mutationCallback);

export function hookUpMutationObserver(el: SimpleBemElement) {
  observer.observe(el, mutationConfig);
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
