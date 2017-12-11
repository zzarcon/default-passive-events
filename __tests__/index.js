const eventListenerOptionsSupportedMock = jest.fn();
const addEventListenerSpy = jest.spyOn(EventTarget.prototype, 'addEventListener');
const handler = () => {};

describe('passive events are supported', () => {
  beforeEach(() => {
    jest.doMock('../src/utils', () => ({
      eventListenerOptionsSupported: () => true
    }));

    require('../src');
  });

  it('should use passive=true when no options are passed and is a valid passive event name', () => {
    document.addEventListener('scroll', handler);

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', handler, {
      passive: true,
      capture: false
    });
  });

  it('should merge "useCapture" with passive=true', () => {
    document.addEventListener('click', handler, false);
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler, {
      passive: false,
      capture: false
    });
  });

  it('should work when passing options object', () => {
    document.addEventListener('touchstart', handler, {capture: false});
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', handler, {
      passive: true,
      capture: false
    });
  });

  it('should override passive when passed {passive: false}', () => {
    document.addEventListener('click', handler, {passive: false});
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler, {
      passive: false,
      capture: false
    });
  });

  it('should override passive when passed {passive: true} and event name is unsupported', () => {
    document.addEventListener('click', handler, {passive: true});
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler, {
      passive: true,
      capture: false
    });
  });

  it('should use passive=false when event name is an unsupported passive event', () => {
    document.addEventListener('click', handler);
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler, {
      passive: false,
      capture: false
    });
  });
});

describe.skip('passive events are not supported', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('../src/utils', () => ({
      eventListenerOptionsSupported: () => false
    }));
  });

  it('should use pass event handler arguments down', () => {
    document.addEventListener('click', handler);

    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler);
  });
});