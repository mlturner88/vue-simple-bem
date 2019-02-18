import { PluginObject } from 'vue/types';
import { bemDirective } from './directive';

export interface IVueSimpleBemOptions {
  name?: string;
}

const defaultOptions = {
  name: 'bem'
};

export const bemPlugin = {
  install(vue, options) {
    const { name } = { ...defaultOptions, ...options };
    vue.directive(name, bemDirective);
  }
} as PluginObject<IVueSimpleBemOptions>;

export const bem = bemDirective;
