(function() {
  var supportsPassive = eventListenerOptionsSupported();  

  if (supportsPassive) {
    var addEvent = EventTarget.prototype.addEventListener;
    overwriteAddEvent(addEvent);
  }

  function overwriteAddEvent(superMethod) {
    var defaultOptions = {
      passive: true,
      capture: false
    };

    EventTarget.prototype.addEventListener = function(type, listener, options) {
      var usesListenerOptions = typeof options === 'object';
      var useCapture = usesListenerOptions ? options.capture : options;

      options = usesListenerOptions ? options : {};
      options.passive = options.passive !== undefined ? options.passive : defaultOptions.passive;
      options.capture = useCapture !== undefined ? useCapture : defaultOptions.capture;
      
      superMethod.call(this, type, listener, options);
    };
  }

  function eventListenerOptionsSupported() {
    var sopported = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function() {
          sopported = true;
        }
      });
      window.addEventListener("test", null, opts);
    } catch (e) {}

    return sopported;
  }
})();