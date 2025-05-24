import { eventListenerOptionsSupported } from './utils';

const defaultOptions = {
  passive: true,
  capture: false,
};
const defaultSupportedPassiveTypes = [
  'scroll',
  'wheel',
  'touchstart',
  'touchmove',
  'touchenter',
  'touchend',
  'touchleave',
  'mouseout',
  'mouseleave',
  'mouseup',
  'mousedown',
  'mousemove',
  'mouseenter',
  'mousewheel',
  'mouseover',
  'pointermove',
  'pointerenter',
  'pointerleave',
  'pointerdown',
  'pointerup',
  'animationstart',
  'animationend',
  'animationiteration',
  'transitionstart',
  'transitionend',
  'transitionrun',
  'transitioncancel',
];
const getDefaultPassiveOption = (passive, eventName) => {
  if (passive !== undefined) return passive;
  const supportedPassiveTypes =
    typeof window !== 'undefined' &&
    window.defaultPassiveEvents_supportedPassiveEvents
      ? window.defaultPassiveEvents_supportedPassiveEvents
      : defaultSupportedPassiveTypes;

  return supportedPassiveTypes.indexOf(eventName) === -1
    ? false
    : defaultOptions.passive;
};

const getWritableOptions = (options) => {
  const passiveDescriptor = Object.getOwnPropertyDescriptor(options, 'passive');

  return passiveDescriptor &&
    passiveDescriptor.writable !== true &&
    passiveDescriptor.set === undefined
    ? Object.assign({}, options)
    : options;
};

const overwriteAddEvent = (superMethod) => {
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    const usesListenerOptions = typeof options === 'object' && options !== null;
    const useCapture = usesListenerOptions ? options.capture : options;

    options = usesListenerOptions ? getWritableOptions(options) : {};
    options.passive = getDefaultPassiveOption(options.passive, type);
    options.capture =
      useCapture === undefined ? defaultOptions.capture : useCapture;

    superMethod.call(this, type, listener, options);
  };

  EventTarget.prototype.addEventListener._original = superMethod;
};

const supportsPassive = eventListenerOptionsSupported();

if (supportsPassive) {
  const addEvent = EventTarget.prototype.addEventListener;
  overwriteAddEvent(addEvent);
}
