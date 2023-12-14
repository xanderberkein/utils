'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = fnv1A;
var FNV_32 = 2166136261;
var REPL_NAN = 'nan';
var REPL_TRUE = 'true';
var REPL_FALSE = 'false';
var REPL_UNDEF = 'undefined';
var REPL_NULL = 'null';
function fnv1A(data) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FNV_32;
  var hash = offset;
  var sanitized;
  if (typeof data === 'string') {
    sanitized = data;
  } else if (Number.isFinite(data)) {
    sanitized = "".concat(data);
  } else if (Array.isArray(data) || Object.prototype.toString.call(data) === '[object Object]') {
    sanitized = JSON.stringify(data);
  } else if (Object.prototype.toString.call(data) === '[object RegExp]') {
    sanitized = data.toString();
  } else if (data instanceof Date) {
    sanitized = "".concat(data.getTime());
  } else if (Number.isNaN(data) || data === Infinity) {
    sanitized = REPL_NAN;
  } else if (data === !1) {
    sanitized = REPL_FALSE;
  } else if (data === !0) {
    sanitized = REPL_TRUE;
  } else if (data === null) {
    sanitized = REPL_NULL;
  } else if (data === undefined) {
    sanitized = REPL_UNDEF;
  } else {
    throw new TypeError('An FNV1A Hash could not be calculated for this datatype');
  }
  for (var i = 0; i < sanitized.length; i++) {
    hash ^= sanitized.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}