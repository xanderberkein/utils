'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;
var _noopreturn = _interopRequireDefault(require("../function/noopreturn"));
var _is = _interopRequireDefault(require("../array/is"));
var _is2 = _interopRequireDefault(require("./is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _default() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var next = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _noopreturn["default"];
  if (!(0, _is2["default"])(obj) || (0, _is["default"])(obj)) {
    throw new TypeError('Please pass an object to forValues');
  }
  Object.keys(obj).forEach(function (key, index) {
    obj[key] = next(key, obj[key], index);
  });
  return obj;
}