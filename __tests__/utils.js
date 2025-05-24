import { eventListenerOptionsSupported } from '../src/utils';
const spy = {
  addEventListener: jest.spyOn(window, 'addEventListener'),
};

describe('eventListenerOptionsSupported test', () => {
  it('should return true when passive event property is supported', () => {
    spy.addEventListener.mockImplementationOnce((_type, _listener, options) => {
      options.passive;
    });

    expect(eventListenerOptionsSupported()).toBe(true);
  });

  it('should return false when passive event property is NOT supported', () => {
    spy.addEventListener.mockImplementationOnce(() => {
      throw '';
    });

    expect(eventListenerOptionsSupported()).toBe(false);
  });
});
