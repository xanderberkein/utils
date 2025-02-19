'use strict';

/**
 * Check whether or not a provided value is a number
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is a number
 */
function isNumber (val:unknown):val is number {
    return Number.isFinite(val);
}

export {isNumber, isNumber as default};
