'use strict';

export default function isNotEmptyString (val, trimmed = true) {
    if (typeof val !== 'string' && !(val instanceof String)) return false;
    return (trimmed ? val.trim() : val).length !== 0;
}
