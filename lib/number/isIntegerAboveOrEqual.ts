'use strict';

/**
 * Check whether or not the provided value is an integer above or equal
 * to another value
 *
 * @param val - Value to verify
 * @param ref - Reference the provided value needs to be above or equal to
 *
 * @returns Whether or not the value is above or equal to the reference
 */
function isIntegerAboveOrEqual (val:unknown, ref:number):val is number {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : (val as number) >= ref;
}

export {isIntegerAboveOrEqual, isIntegerAboveOrEqual as default};
