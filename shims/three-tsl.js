// Minimal shim for 'three/tsl' used by three-globe during build.
// Exports no-op functions/constructors so module resolution succeeds.

export function Fn(fn) {
  return function () {
    return {
      compute: function () {
        return {}; // opaque compute node
      },
    };
  };
}
export function If(cond, fn) {
  // no-op
  return;
}
export function uniform(v) {
  return { value: v };
}
export function storage(attr, type, len) {
  return {
    element: function (i) {
      // For build-time usage this is fine; runtime compute is a no-op in shim
      return { xy: { x: 0, y: 0 }, z: 0 };
    },
    length: len || (attr && attr._length) || 0,
  };
}
export function float(v) {
  return {
    value: v,
    mul() {
      return this;
    },
    div() {
      return this;
    },
    add() {
      return this;
    },
    sub() {
      return this;
    },
    lessThan() {
      return false;
    },
  };
}
export const instanceIndex = 0;
export function Loop(n, fn) {
  /* no-op */
}
export function sqrt(x) {
  return {
    mul() {
      return this;
    },
    div() {
      return this;
    },
  };
}
export function sin(x) {
  return {
    mul() {
      return this;
    },
  };
}
export function cos(x) {
  return {
    mul() {
      return this;
    },
  };
}
export function asin(x) {
  return {
    mul() {
      return this;
    },
  };
}
export function exp(x) {
  return {
    mul() {
      return this;
    },
  };
}
export function negate(x) {
  return {
    mul() {
      return this;
    },
  };
}
