# `default-passive-events` [![Build Status](https://travis-ci.org/zzarcon/default-passive-events.svg?branch=master)](https://travis-ci.org/zzarcon/default-passive-events)
> Makes {passive: true} by default when EventListenerOptions are supported

40 lines snippet that enables [passive event listeners](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md) by default. It basically will set **{ passive: true }** automatically every time you declare a new [event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

# Installation

```
$ yarn add default-passive-events
```

# Usage

Simply require the package:

```
require('default-passive-events');
```

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

Check the [demo.html](https://github.com/zzarcon/default-passive-events/blob/master/demo.html) for a working example.

# Motivation

Just to take benefit in your apps without having to edit every single event listener you already have.

# Resources

* About passive event listeners https://medium.com/@devlucky/about-passive-event-listeners-224ff620e68c
* EventListenerOptions https://github.com/WICG/EventListenerOptions
* Explanation https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
* Polyfill https://github.com/WICG/EventListenerOptions/blob/gh-pages/EventListenerOptions.polyfill.js
* Spec https://dom.spec.whatwg.org/#dictdef-eventlisteneroptions
* Chrome feature https://www.chromestatus.com/features#passive
* About scrolling performance https://plus.google.com/+RickByers/posts/cmzrtyBYPQc
* Nice Chrome blog article https://blog.chromium.org/2016/05/new-apis-to-help-developers-improve.html

# Author

[@zzarcon](https://github.com/zzarcon)
