# `default-passive-events` [![Build Status](https://travis-ci.org/zzarcon/default-passive-events.svg?branch=master)](https://travis-ci.org/zzarcon/default-passive-events) [![Dependency Status](https://david-dm.org/zzarcon/default-passive-events.svg)](https://david-dm.org/zzarcon/default-passive-events) [![Bundle size](https://img.shields.io/bundlephobia/minzip/default-passive-events)](https://bundlephobia.com/result?p=default-passive-events)

> Makes {passive: true} by default when EventListenerOptions are supported

50 lines snippet that enables [passive event listeners](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md) by default for some events ([see list below](#targeted-events)). It basically will set **{ passive: true }** automatically every time you declare a new [event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

## Installation

```bash
yarn add default-passive-events
```

## Usage

Simply require the package:

```javascript
require('default-passive-events');
```

or include it locally:

```html
<script type="text/javascript" src="node_modules/default-passive-events/dist/index.js"></script>
```

or from [unpkg](https://unpkg.com/#/) [CDN](https://en.wikipedia.org/wiki/Content_delivery_network):

```html
<script type="text/javascript" src="https://unpkg.com/default-passive-events"></script>
```

## Bundle formats

This package is distributed as multiple, different types of output bundles. The most often your bundler will properly choose the correct version by itself.

To get more information about supported bundle formats have a look at [official `microbundle` documentation](https://github.com/developit/microbundle#-output-formats-). Especially interesting is the `modern` format which - if used properly with your bundle system - might produce significantly smaller output code.

## Examples

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

## Demo

Check the [demo page](https://zzarcon.github.io/default-passive-events) for a working example.

## Motivation

Just to take benefit in your apps without having to edit every single event listener you already have.

## Targeted events

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

## Q&A

### Browser rises weird error when I try to preventDefault event inside of a passive listener.

Well, that's true, partly. First of all specification says that you shouldn't ever try to preventDefault from the context of passive listener. But if that's not a possibility you should know that in the console you see only *error-looking log messages*, which are *not actual errors* (ergo: they *do not break your code*).

### Is there a possibility to hide these messages?

Unfortunately, no. Since they are not actual errors there is no way to catch them and (more importantly) there is no way to distinguish whether you're inside of the passive listener context to know when not to call/override preventDefault method. Now, we look at the regarding issue in WHATWG repo whatwg/dom#587.

### Is there a possibility to bring default addEventListener method back for chosen elements/globally (e.g. for time of running some of the code)?

Yes, original addEventListener is available under `_original` property of our's addEventListener's implementation (so - `element.addEventListener._original`). Having that in mind, you can bring it back for however you want, e.g.:

```javascript
element.addEventListener = element.addEventListener._original;
```

## Resources

* About passive event listeners https://medium.com/@devlucky/about-passive-event-listeners-224ff620e68c
* EventListenerOptions https://github.com/WICG/EventListenerOptions
* Explanation https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
* Polyfill https://github.com/WICG/EventListenerOptions/blob/gh-pages/EventListenerOptions.polyfill.js
* Spec https://dom.spec.whatwg.org/#dictdef-eventlisteneroptions
* Chrome feature https://www.chromestatus.com/features#passive
* About scrolling performance https://plus.google.com/+RickByers/posts/cmzrtyBYPQc
* Nice Chrome blog article https://blog.chromium.org/2016/05/new-apis-to-help-developers-improve.html

## Author

[@zzarcon](https://github.com/zzarcon)

## Maintainers

[@zzarcon](https://github.com/zzarcon)
[@frsgit](https://github.com/frsgit)
