'use strict';

import deepSet from './set.js';

export default function deepDefine (obj, path, value = null) {
    return deepSet(obj, path, value, true);
}
