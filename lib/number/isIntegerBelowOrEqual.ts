'use strict';

/**
 * Check whether or not the provided value is an integer below or
 * equal to another value
 *
 * @param val - Value to verify
 * @param ref - Reference the provided value needs to be below or equal to
 *
 * @returns Whether or not the value is below or equal to the reference
 */
function isIntegerBelowOrEqual (val:unknown, ref:number):val is number {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : (val as number) <= ref;
}

export {isIntegerBelowOrEqual, isIntegerBelowOrEqual as default};
