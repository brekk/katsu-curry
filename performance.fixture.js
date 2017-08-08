'use strict';

var _testperf = require('testperf');

var _testperf2 = _interopRequireDefault(_testperf);

var _katsuCurry = require('katsu-curry');

var kLegacy = _interopRequireWildcard(_katsuCurry);

var _index = require('./index');

var kNew = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testCurry = function testCurry(currier) {
  return function () {
    return currier(function (a, b, c) {
      return a + b + c;
    })(0, 1, 2);
  };
};
(0, _testperf2.default)('old', testCurry(kLegacy.curry));
(0, _testperf2.default)('new', testCurry(kNew.curry));