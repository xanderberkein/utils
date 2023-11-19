'use strict';

import isNotEmptyString from '../string/isNotEmpty.js';
import isNotEmptyArray  from './isNotEmpty.js';
import isNotEmptyObject from '../object/isNotEmpty.js';

export default function mapPrimitive (arr, opts = {}) {
    if (!isNotEmptyArray(arr)) return {};

    const OPTS = Object.assign({
        valtrim: false,
        keyround: false,
        valround: false,
    }, isNotEmptyObject(opts) ? opts : {});

    const map = {};
    for (const el of arr) {
        if (Number.isFinite(el)) {
            if (OPTS.keyround === true) {
                map[Math.round(el)] = OPTS.valround ? Math.round(el) : el;
            } else {
                map[el] = OPTS.valround ? Math.round(el) : el;
            }
        } else if (isNotEmptyString(el)) {
            map[el.trim()] = OPTS.valtrim ? el.trim() : el;
        }
    }

    return map;
}
