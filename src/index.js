import {eventListenerOptionsSupported} from './utils';

const defaultOptions = {
  passive: true,
  capture: false
};
const supportedPassiveTypes = [
  'scroll', 'whell',
  'touchstart', 'touchmove', 'touchenter', 'touchend', 'touchleave',
  'mouseout', 'mouseleave', 'mouseup', 'mousedown', 'mousemove', 'mouseenter', 'mousewheel', 'mouseover'
];
const getDefaultPassiveOption = (passive, eventName) => {
  if (passive !== undefined) return passive;

  return supportedPassiveTypes.indexOf(eventName) === -1 ? false : defaultOptions.passive;
}

const overwriteAddEvent = (superMethod) => {
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    const usesListenerOptions = typeof options === 'object';
    const useCapture = usesListenerOptions ? options.capture : options;

    options = usesListenerOptions ? options : {};
    options.passive = getDefaultPassiveOption(options.passive, type);
    options.capture = useCapture !== undefined ? useCapture : defaultOptions.capture;

    superMethod.call(this, type, listener, options);
  };
};

const supportsPassive = eventListenerOptionsSupported();

if (supportsPassive) {
  const addEvent = EventTarget.prototype.addEventListener;
  overwriteAddEvent(addEvent);
}
