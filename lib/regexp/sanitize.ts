'use strict';

/**
 * Sanitize the provided string input for safe usage within a RegExp, this
 * ensures automatic escaping of characters that have special meaning in regexp.
 *
 * For more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
 *
 * @param val - Value to sanitize
 *
 * @returns Sanitized value
 */
function sanitizeRegExp (val:string):string|false {
    if (typeof val !== 'string') return false;
    return val.trim().replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

export {sanitizeRegExp, sanitizeRegExp as default};
