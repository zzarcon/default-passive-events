#default-passive-events
> Makes {passive: true} by default when EventListenerOptions are supported

40 lines snippet that enables [passive event listeners](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md) by default. It basically will set **{ active: true }** automatically every time you declare a new [event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

#Installation

Download the code with npm `$ npm i default-passive-events -S` or bower `$ bower i default-passive-events -S` and require the **default-passive-events.js** file.

#Usage
Those are some examples and their output:

```javascript
document.addEventListener('click', onClick); // {passive: true, capture: false}
document.addEventListener('click', onClick, true); // {passive: true, capture: true}
document.addEventListener('click', onClick, false); // {passive: true, capture: false}
document.addEventListener('click', onClick, {passive: false}); // {passive: false, capture: false}
document.addEventListener('click', onClick, {passive: false, capture: false}); // {passive: false, capture: false}
document.addEventListener('click', onClick, {passive: false, capture: true}); // {passive: false, capture: true}
document.addEventListener('click', onClick, {passive: true, capture: false}); // {passive: true, capture: false}
document.addEventListener('click', onClick, {passive: true, capture: true}); // {passive: true, capture: true}
```

Check the [demo.html](asd) for a working example.

#Motivation
Just if you want to take benefit in your apps without having to edit every single one event listener you already have.

#Resources

* EventListenerOptions https://github.com/WICG/EventListenerOptions
* Explanation https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
* Polyfill https://github.com/WICG/EventListenerOptions/blob/gh-pages/EventListenerOptions.polyfill.js
* Spec https://dom.spec.whatwg.org/#dictdef-eventlisteneroptions
* Chrome feature https://www.chromestatus.com/features#passive
* About scrolling performance https://plus.google.com/+RickByers/posts/cmzrtyBYPQc
* Nice Chrome blog article https://blog.chromium.org/2016/05/new-apis-to-help-developers-improve.html

#Author

[@zzarcon](https://github.com/zzarcon)