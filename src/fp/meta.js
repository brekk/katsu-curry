import {curry} from '../curry/katsu'

/**
 * @method stringable
 * @param {string} prefix - some prefix
 * @param {string[]} args - arguments list
 * @returns {string} toString summary
 * @private
 */
export const stringable = curry((prefix, args) => () =>
  prefix + `(` + args.map((a) => a.toString()).join(`,`) + `)`
)
