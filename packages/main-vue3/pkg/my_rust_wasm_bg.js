let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}

/**
* @param {number} b
* @returns {bigint}
*/
export function add_range(b) {
    const ret = wasm.add_range(b);
    return ret;
}

/**
* @param {number} num
* @returns {bigint}
*/
export function fib_rec(num) {
    const ret = wasm.fib_rec(num);
    return ret;
}

/**
* @param {number} num
* @returns {bigint}
*/
export function fib(num) {
    const ret = wasm.fib(num);
    return ret;
}

