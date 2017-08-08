import testPerf from 'testperf'
import curry from 'ramda/src/curry'
import * as kLegacy from 'katsu-curry'
import * as kNew from './index'

const testCurry = (currier) => () => currier((a, b, c) => a + b + c)(0, 1, 2)
testPerf(`old v.${kLegacy.version}`, testCurry(kLegacy.curry))
testPerf(`new v.0.1.2`, testCurry(kNew.curry))
testPerf(`ramda`, testCurry(curry))
