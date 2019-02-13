import { PluginObject } from 'vue/types';
import bem from './directive';
export { default as bem } from './directive';

export interface IVueSimpleBemOptions {
  name?: string;
}

const defaultOptions = {
  name: 'bem'
};

export default {
  install(vue, options) {
    const { name } = { ...defaultOptions, ...options };
    vue.directive(name, bem);
  }
} as PluginObject<IVueSimpleBemOptions>;
