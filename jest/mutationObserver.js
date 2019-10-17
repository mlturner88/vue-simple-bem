global.MutationObserver = function(callback) {
  this.callback = callback;
  this.observe = jest.fn();
  this.disconnect = jest.fn();
};
