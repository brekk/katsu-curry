// import testPerf from 'testperf'
// import curry from 'ramda/src/curry'
// import * as kLegacy from 'katsu-curry'
// import * as kNew from './index'
const testPerf = require(`testperf`)
const curry = require(`ramda/src/curry`)
const _curry = require(`lodash/fp/curry`)
// const kLegacy = require(`katsu-curry`)
const kNew = require(`../katsu-curry`)

const random = () => Math.round(Math.random() * 10)

const testCurry = (currier) => () => currier((a, b, c) => a + b + c)(random(), random(), random())

testPerf(`katsu v.0.7.0`, testCurry(kNew.curry))
testPerf(`ramda v.0.24.1`, testCurry(curry))
testPerf(`lodash v.4.17.4`, testCurry(_curry))
