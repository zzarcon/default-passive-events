export const eventListenerOptionsSupported = () => {
  let supported = false;

  try {
    const opts = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get() {
        supported = true;
      },
    });

    window.addEventListener('test', null, opts);
    window.removeEventListener('test', null, opts);
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    /* empty */
  }

  return supported;
};
