export type SimpleBemElement = HTMLElement & {
  __$simpleBemBlock__: string;
  __$simpleBemElement__: string | undefined;
  __$simpleBemMods__: string[];
  __$simpleBemObserver__: MutationObserver;
};
