/**
 * 1 over Quakes' fast inverse square root, making a faster sqrt.
 * Implemented in C, compiled to WASM.
 */

const wasmCode = new Uint8Array([0,97,115,109,1,0,0,0,1,134,128,128,128,0,1,96,1,125,1,125,3,130,128,128,128,0,1,0,4,132,128,128,128,0,1,112,0,0,5,131,128,128,128,0,1,0,1,6,129,128,128,128,0,0,7,145,128,128,128,0,2,6,109,101,109,111,114,121,2,0,4,115,113,114,116,0,0,10,179,128,128,128,0,1,173,128,128,128,0,0,67,0,0,128,63,32,0,67,0,0,0,191,148,65,223,179,221,249,5,32,0,188,65,1,117,107,190,34,0,148,32,0,148,67,0,0,192,63,146,32,0,148,149,11]);

let wasmModule = new WebAssembly.Module(wasmCode);
let wasmInstance = new WebAssembly.Instance(wasmModule, {});

/**
 * Returns the square root of a given number
 * 
 * @param {number} x given number
 * 
 * @return {number} square root of x
 */
export default function sqrt(x) {
    return wasmInstance.exports.sqrt(x);
}