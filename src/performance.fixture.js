import testPerf from 'testperf'
import * as kLegacy from 'katsu-curry'
import * as kNew from './index'

const testCurry = (currier) => () => currier((a, b, c) => a + b + c)(0, 1, 2)
testPerf(`old`, testCurry(kLegacy.curry))
testPerf(`new`, testCurry(kNew.curry))
