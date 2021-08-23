import { createApp, h } from 'vue';
import {
  default as plugin,
  bem as directive,
  IVueSimpleBemOptions,
} from '../bem';

it('should register directive using default name', () => {
  const directiveSpy = setupTest();
  expect(directiveSpy).toHaveBeenCalledTimes(1);
  expect(directiveSpy).toHaveBeenCalledWith('bem', directive);
});

it('should register directive using given name', () => {
  const directiveSpy = setupTest({ name: 'extra' });
  expect(directiveSpy).toHaveBeenCalledTimes(1);
  expect(directiveSpy).toHaveBeenCalledWith('extra', directive);
});

function setupTest(options: Partial<IVueSimpleBemOptions> = {}) {
  const app = createApp(() => h('div'));
  const spy = jest.spyOn(app, 'directive');
  app.use(plugin, options);
  return spy;
}
