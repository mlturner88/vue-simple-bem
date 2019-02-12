import { PluginObject } from 'vue/types';
import bem from './directive';

export interface VueSimpleBemOptions {
	name?: string;
}

const defaultOptions = {
	name: 'bem'
};

export default <PluginObject<VueSimpleBemOptions>>{
	install(vue, options) {
		const { name } = { ...defaultOptions, ...options };
		vue.directive(name, bem);
	}
};
