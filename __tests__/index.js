const throwPreventDefault = () => { throw 'Unable to preventDefault inside passive event listener invocation.' };
const handler             = {
  simple : () => {}
};
const spy                 = {
  addEventListener : jest.spyOn(EventTarget.prototype, 'addEventListener')
};
const init                = {
  addEventListener : EventTarget.prototype.addEventListener
};

describe('passive events are supported', () => {
  beforeEach(() => {
    jest.doMock('../src/utils', () => ({
      eventListenerOptionsSupported: () => true
    }));
    require('../src');
  });

  it('should use passive=true when no options are passed and is a valid passive event name', () => {
    document.addEventListener('mouseup', handler.simple);

    expect(spy.addEventListener).toHaveBeenCalledWith('mouseup', handler.simple, {
      passive: true,
      capture: false
    });
  });

  it('should merge useCapture=false with passive=true', () => {
    document.body.addEventListener('mouseup', handler.simple, false);
    expect(spy.addEventListener).toHaveBeenCalledWith('mouseup', handler.simple, {
      passive: true,
      capture: false
    });
  });

  it('should work when passed {capture: false}', () => {
    document.addEventListener('mouseup', handler.simple, {capture: false});
    expect(spy.addEventListener).toHaveBeenCalledWith('mouseup', handler.simple, {
      passive: true,
      capture: false
    });
  });

  it('should leave passed {passive: false}', () => {
    document.addEventListener('mouseup', handler.simple, {passive: false});
    expect(spy.addEventListener).toHaveBeenCalledWith('mouseup', handler.simple, {
      passive: false,
      capture: false
    });
  });

  it('should leave passed {passive: true} and event name is unsupported', () => {
    document.addEventListener('click', handler.simple, {passive: true});
    expect(spy.addEventListener).toHaveBeenCalledWith('click', handler.simple, {
      passive: true,
      capture: false
    });
  });

  it('should use passive=false when event name is an unsupported passive event', () => {
    document.addEventListener('click', handler.simple);
    expect(spy.addEventListener).toHaveBeenCalledWith('click', handler.simple, {
      passive: false,
      capture: false
    });
  });

  it('should work when passing options object with getter-only passive property', () => {
    var optionsWithPassiveGetter = {
      get passive () {
        return true;
      }
    };

    document.addEventListener('mouseup', handler.simple, optionsWithPassiveGetter);
    expect(spy.addEventListener).toHaveBeenCalledWith('mouseup', handler.simple, {
      passive: true,
      capture: false
    });
  });

  it('should original implementation be visible under addEventListener._original property', () => {
    expect(spy.addEventListener).toEqual(init.addEventListener);
  });
});

describe('passive events are not supported', () => {
  beforeEach(() => {
    jest.resetModules();
    EventTarget.prototype.addEventListener = init.addEventListener;

    jest.doMock('../src/utils', () => ({
      eventListenerOptionsSupported: () => false
    }));
    require('../src');
  });

  it('should use pass event handler arguments down', () => {
    document.addEventListener('mouseup', handler.simple);

    expect(spy.addEventListener).toHaveBeenCalledWith('mouseup', handler.simple);
  });
});