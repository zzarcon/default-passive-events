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

  it('should use passive=true when no options are passed', () => {
    document.addEventListener('click', handler);

    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler, {
      passive: true,
      capture: false
    });
  });

  it('should merge "useCapture" with passive=true', () => {
    document.addEventListener('click', handler, false);
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler, {
      passive: true,
      capture: false
    });
  });

  it('should work when passing options object', () => {
    document.addEventListener('click', handler, {capture: false});
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler, {
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