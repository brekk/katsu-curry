var PLACEHOLDER="\uD83C\uDF5B",$=PLACEHOLDER,innerpipe=function(b){return function(c){for(var d=b[0],e=b.slice(1),f=d(c),g=0;g<e.length;g++)f=e[g](f);return f}};function pipe(){for(var a=arguments,b=arguments.length,c=Array(b),d=0;d<b;++d)c[d]=a[d];return innerpipe(c)}function compose(){for(var a=arguments,b=arguments.length,c=Array(b),d=0;d<b;++d)c[d]=a[d];return innerpipe(c.reverse())}var version="0.5.1",K=function(a){return function(){return a}},I=function(a){return a};var bindInternal3=function(d,e){return function(f,a,b){return d.call(e,f,a,b)}};var some$1=function(a,b,c){var d,e=a.length,f=c===void 0?b:bindInternal3(b,c);for(d=0;d<e;d++)if(f(a[d],d,a))return!0;return!1},curry=function(a){if("function"!=typeof a)throw new TypeError("Expected to be given a function to curry!");var b=function(a){return a===PLACEHOLDER};return function c(){for(var d=arguments,e=arguments.length,f=Array(e),g=0;g<e;++g)f[g]=d[g];var h=some$1(f,b)?function(a){for(var c=a.length;!b(a[c]);)c--;return c}(f):f.length;return h>=a.length?a.apply(this,f):function(){for(var a=arguments,d=arguments.length,e=Array(d),g=0;g<d;++g)e[g]=a[g];return c.apply(this,f.map(function(a){return b(a)&&e[0]?e.shift():a}).concat(e))}}},curryify=function(a){if("function"!=typeof a)throw new TypeError("Expected to be given a function to test placeholders!");return function(b){if("function"!=typeof b)throw new TypeError("Expected to be given a function to curry!");return function c(){for(var d=arguments,e=arguments.length,f=Array(e),g=0;g<e;++g)f[g]=d[g];var h=some$1(f,a)?function(b){for(var c=b.length;!a(b[c]);)c--;return c}(f):f.length;return h>=b.length?b.apply(this,f):function(){for(var b=arguments,d=arguments.length,e=Array(d),g=0;g<d;++g)e[g]=b[g];return c.apply(this,f.map(function(b){return a(b)&&e[0]?e.shift():b}).concat(e))}}}},remapArray=curry(function(a,b){var c=Array.from(b);return c.length?c.map(function(b,d){return a.includes(d)?c[a[d]]:b}):c}),remap=curry(function(a,b){var c=remapArray(a),d=curry(b);return function(){var a=c(Array.from(arguments));return d.apply(null,a)}}),prop=curry(function(a,b){return b[a]}),_assign=Object.assign,_keys=Object.keys,keys=_keys,assign=_assign,merge=curry(function(c,a){return assign({},c,a)}),propLength=prop("length"),objectLength=pipe(keys,propLength),length=function(a){return"object"==typeof a?objectLength(a):propLength(a)},delegatee=curry(function(a,b,c){return c[a](b)}),filter=delegatee("filter"),flipIncludes=curry(function(a,b){return a.includes(b)}),matchingKeys=curry(function(a,b){return filter(flipIncludes(a),keys(b))}),matchingKeyCount=curry(function(a,b){return pipe(matchingKeys(a),length)(b)}),curryObjectByCondition=curry(function(a,b,c){return function d(e){return a(b,e)?c(e):pipe(merge(e),d)}}),expectKArgs=function(a,b){return matchingKeyCount(a,b)>=length(a)},curryObjectK=curryObjectByCondition(expectKArgs),expectNArgs=function(a,b){return length(b)>=a},curryObjectN=curryObjectByCondition(expectNArgs),curryObjectKN=curryObjectByCondition(function(a,b){var c=a.n,d=a.k;return expectKArgs(d,b)||expectNArgs(c,b)});export{$,PLACEHOLDER,compose,pipe,version,K,I,curry,curryify,remap,remapArray,curryObjectK,curryObjectN,curryObjectKN};
