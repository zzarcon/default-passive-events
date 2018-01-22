# `default-passive-events` [![Build Status](https://travis-ci.org/zzarcon/default-passive-events.svg?branch=master)](https://travis-ci.org/zzarcon/default-passive-events)
> Makes {passive: true} by default when EventListenerOptions are supported

50 lines snippet that enables [passive event listeners](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md) by default for some events ([see list below](#targeted-events)). It basically will set **{ passive: true }** automatically every time you declare a new [event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
Also, you don't need to worry about errors possibly raised by `event.preventDefault()` calls existing in code of yours or some library you use - **default-passive-events** takes care of that by overriding `preventDefault`method with simple [NOOP](https://en.wikipedia.org/wiki/NOP).

# Installation

```
$ yarn add default-passive-events
```

# Usage

Simply require the package:

```
require('default-passive-events');
```

or include it locally:

```
<script type="text/javascript" src="node_modules/default-passive-events/dist/index.js"></script>
```

or from [unpkg](https://unpkg.com/#/) [CDN](https://en.wikipedia.org/wiki/Content_delivery_network):

```
<script type="text/javascript" src="https://unpkg.com/default-passive-events"></script>
```

Those are some examples and their output:

```javascript
document.addEventListener('mouseup', onMouseUp); // {passive: true, capture: false}
document.addEventListener('mouseup', onMouseUp, true); // {passive: true, capture: true}
document.addEventListener('mouseup', onMouseUp, false); // {passive: true, capture: false}
document.addEventListener('mouseup', onMouseUp, {passive: false}); // {passive: false, capture: false}
document.addEventListener('mouseup', onMouseUp, {passive: false, capture: false}); // {passive: false, capture: false}
document.addEventListener('mouseup', onMouseUp, {passive: false, capture: true}); // {passive: false, capture: true}
document.addEventListener('mouseup', onMouseUp, {passive: true, capture: false}); // {passive: true, capture: false}
document.addEventListener('mouseup', onMouseUp, {passive: true, capture: true}); // {passive: true, capture: true}
```

# Demo
Check the [demo page](https://zzarcon.github.io/default-passive-events) for a working example.

# Motivation

Just to take benefit in your apps without having to edit every single event listener you already have.

# Targeted events

Default-passive-events package makes following event listeners passive by default:

* scroll
* wheel
* touchstart
* touchmove
* touchenter
* touchend
* touchleave
* mouseout
* mouseleave
* mouseup
* mousedown
* mousemove
* mouseenter
* mousewheel
* mouseover

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

# Maintainers

[@zzarcon](https://github.com/zzarcon)
[@frsgit](https://github.com/frsgit)
