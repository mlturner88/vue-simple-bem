import { Plugin, App } from 'vue';
import { bemDirective } from './directive';

export interface IVueSimpleBemOptions {
  name?: string;
}

const defaultOptions = { name: 'bem' };

const bemPlugin: Plugin = {
  install(app: App, options: { name: string } = defaultOptions) {
    const { name } = { ...defaultOptions, ...options };
    app.directive(name, bemDirective);
  },
};

export default bemPlugin;
export const bem = bemDirective;
