// Minimal shim for 'three/webgpu' to avoid import errors in environments
// where three's webgpu export is unavailable. This provides no-op
// implementations for the named exports used by three-globe so the app can build.

export class StorageInstancedBufferAttribute {
  constructor(arrayOrLength, itemSize) {
    // support either: (TypedArray, itemSize) or (length, itemSize)
    if (typeof arrayOrLength === "number") {
      this._length = arrayOrLength;
      this._itemSize = itemSize || 1;
      this.array = new Float32Array(this._length * this._itemSize);
    } else if (arrayOrLength && arrayOrLength.length !== undefined) {
      this.array = arrayOrLength;
      this._itemSize = itemSize || 1;
      this._length = Math.floor(this.array.length / this._itemSize);
    } else {
      this._length = 0;
      this._itemSize = itemSize || 1;
      this.array = new Float32Array(0);
    }
  }
}

export class WebGPURenderer {
  constructor() {
    // shim renderer - methods used will be no-ops
    if (typeof console !== "undefined") {
      console.warn(
        "[shim] WebGPURenderer used but not available in this environment."
      );
    }
  }
  setSize() {}
  setPixelRatio() {}

  async computeAsync(node) {
    // no-op compute, immediately resolve
    return Promise.resolve();
  }

  async getArrayBufferAsync(storageAttr) {
    // Return a buffer compatible with what three-globe expects.
    if (!storageAttr) return new Float32Array(0).buffer;
    if (storageAttr.array && storageAttr.array.buffer) {
      return storageAttr.array.buffer;
    }
    const len = storageAttr._length || 0;
    return new Float32Array(len).buffer;
  }
}

export default { StorageInstancedBufferAttribute, WebGPURenderer };
