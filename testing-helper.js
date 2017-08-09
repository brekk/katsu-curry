"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global expect */
var t = exports.t = {
  plan: function plan(x) {
    return expect.assertions(x);
  },
  is: function is(a, b) {
    return expect(a).toBe(b);
  },
  not: function not(a, b) {
    return expect(a).not.toBe(b);
  },
  deepEqual: function deepEqual(a, b) {
    return expect(a).toEqual(b);
  },
  notDeepEqual: function notDeepEqual(a, b) {
    return expect(a).not.toEqual(b);
  },
  truthy: function truthy(x) {
    return expect(x).toBeTruthy();
  },
  true: function _true(x) {
    return expect(x).toBe(true);
  },
  falsy: function falsy(x) {
    return expect(x).toBeFalsy();
  },
  false: function _false(x) {
    return expect(x).toBe(false);
  },
  throws: function throws(x, y) {
    return expect(x).toThrow(y);
  }
};