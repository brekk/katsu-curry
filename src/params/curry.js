import {PLACEHOLDER} from '@placeholder/index'
import {curryify} from '@params/ify'
const isPlaceholder = (x) => {
  console.log(`${x} vs. ${PLACEHOLDER} === ${x === PLACEHOLDER}`)
  return x === PLACEHOLDER
}
export const curry = curryify(isPlaceholder)
