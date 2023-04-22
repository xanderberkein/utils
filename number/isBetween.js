'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isBetween;
var _is = _interopRequireDefault(require("../number/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function isBetween(val, min, max) {
  if (!(0, _is["default"])(val) || !(0, _is["default"])(min) || !(0, _is["default"])(max) || min >= max) return !1;
  return val >= min && val <= max;
}