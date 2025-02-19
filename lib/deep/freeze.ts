'use strict';

type deepInput = {[key:string]:any}|{[key:string]:any}[]|any[];

type Frozen<T> = {
    readonly [K in keyof T]: Frozen<T[K]>
}

function deep (obj:deepInput) {
    if (Array.isArray(obj)) {
        for (const el of obj) deep(el);
    } else {
        for (const key of Object.keys(obj)) {
            if (
                Object.prototype.toString.call(obj[key]) === '[object Object]' ||
                Array.isArray(obj[key])
            ) deep(obj[key]);
        }
    }
    return Object.freeze(obj);
}

/**
 * Recursively freezes all properties of an object
 *
 * @param obj - Object to deep freeze
 *
 * @returns Deeply frozen object
 */
function deepFreeze <T extends deepInput> (obj:T):Frozen<T> {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' &&
        !Array.isArray(obj)
    ) throw new TypeError('Only objects/arrays can be frozen');
    return deep(obj) as Frozen<T>;
}

export {deepFreeze, deepFreeze as default};
