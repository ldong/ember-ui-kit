
const raf = window.requestAnimationFrame;
const caf = window.cancelAnimationFrame;

export function throttle(fn) {
  let wait = false;

  return function(...args) {
    if (!wait) {
      fn(...args);
    }
    else {
      wait = args;
    }

    return raf(function() {
      if (wait) {
        fn(...wait);

        wait = null;
      }
    });
  };
}

export function debounce(fn) {
  let id = null;

  return function(...args) {
    caf(id);

    id = raf(function() {
      fn(...args);
    });
  };
}
