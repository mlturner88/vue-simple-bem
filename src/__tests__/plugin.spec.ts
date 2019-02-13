import bem, { bem as directive } from '../bem';

const vue = { directive: jest.fn() };

beforeEach(() => {
  vue.directive.mockReset();
});

it('should register directive using default name', () => {
  bem.install(vue as any);

  expect(vue.directive).toHaveBeenCalledTimes(1);
  expect(vue.directive).toHaveBeenCalledWith('bem', directive);
});

it('should register directive using given name', () => {
  bem.install(vue as any, { name: 'extra' });

  expect(vue.directive).toHaveBeenCalledTimes(1);
  expect(vue.directive).toHaveBeenCalledWith('extra', directive);
});
