(function(a,b){'object'==typeof exports&&'undefined'!=typeof module?b(exports):'function'==typeof define&&define.amd?define(['exports'],b):b(a.katsuCurry={})})(this,function(a){'use strict';function b(){for(var a=arguments,b=arguments.length,c=Array(b),e=0;e<b;++e)c[e]=a[e];return d(c)}var c='\uD83C\uDF5B',d=function(b){return function(c){for(var d=b[0],e=b.slice(1),f=d(c),g=0;g<e.length;g++)f=e[g](f);return f}};var e=function(d,e){return function(f,a,b){return d.call(e,f,a,b)}};var f=function(a,b,c){var d,f=a.length,g=c===void 0?b:e(b,c);for(d=0;d<f;d++)if(g(a[d],d,a))return!0;return!1},g=function(a){var b=function(a){return a===c};return function c(){for(var d=arguments,e=arguments.length,g=Array(e),h=0;h<e;++h)g[h]=d[h];var i=f(g,b)?function(a){for(var c=a.length;!b(a[c]);)c--;return c}(g):g.length;return i>=a.length?a.apply(this,g):function(){for(var a=arguments,d=arguments.length,e=Array(d),f=0;f<d;++f)e[f]=a[f];return c.apply(this,g.map(function(a){return b(a)&&e[0]?e.shift():a}).concat(e))}}},h=g(function(a,b){var c=Array.from(b);return c.length?c.map(function(b,d){return a.includes(d)?c[a[d]]:b}):c}),i=g(function(a,b){var c=h(a),d=g(b);return function(){var a=c(Array.from(arguments));return d.apply(null,a)}}),j=g(function(a,b){return b&&a&&b[a]}),k=Object.assign,l=Object.keys,m=l,n=g(function(c,a){return k({},c,a)}),o=j('length'),p=b(m,o),q=function(a){return'object'==typeof a?p(a):o(a)},r=g(function(a,b,c){return c[a](b)}),s=r('filter'),t=g(function(a,b){return a.includes(b)}),u=g(function(a,b){return s(t(a),m(b))}),v=g(function(a,c){return b(u(a),q)(c)}),w=function(a,b){return v(a,b)>=Object.keys(a).length},x=g(function(a,b){return function c(d){return Object.keys(d).filter(function(b){return a.includes(b)}).length===a.length?b(d):function(a){return c(Object.assign({},d,a))}}});a.$=c,a.PLACEHOLDER=c,a.compose=function(){for(var a=arguments,b=arguments.length,c=Array(b),e=b-1;-1<e;--e)c[e]=a[e];return d(c)},a.pipe=b,a.version='0.7.2',a.K=function(a){return function(){return a}},a.I=function(a){return a},a.curry=g,a.curryify=function(a){if('function'!=typeof a)throw new TypeError('Expected to be given a function to test placeholders!');return function(b){if('function'!=typeof b)throw new TypeError('Expected to be given a function to curry!');return function c(){for(var d=arguments,e=arguments.length,g=Array(e),h=0;h<e;++h)g[h]=d[h];var i=f(g,a)?function(b){for(var c=b.length;!a(b[c]);)c--;return c}(g):g.length;return i>=b.length?b.apply(this,g):function(){for(var b=arguments,d=arguments.length,e=Array(d),f=0;f<d;++f)e[f]=b[f];return c.apply(this,g.map(function(b){return a(b)&&e[0]?e.shift():b}).concat(e))}}}},a.remap=i,a.remapArray=h,a.curryObjectK=x,a.curryObjectN=function(a,b){return function c(d){return d&&Object.keys(d).length>=a?b(d):function(a){return c(Object.assign({},d,a))}}},a.curryObjectKN=function(a,b){var c=a.k,d=a.n;return function a(e){return w(c,e)||Object.keys(e).length>=d?b(e):function(b){return a(Object.assign({},e,b))}}},Object.defineProperty(a,'__esModule',{value:!0})});
