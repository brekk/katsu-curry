const fs = require(`fs`)
/* eslint-disable */
fs.readFile(`./benchmark.log`, `utf8`, (e, data) => {
  if (e) {
    throw e
  }
  const byOpsPerSecond = (x, y) => x[1] >= y[1] ? -1 : 1
  const stripCommasAndParseInt = (y) => parseInt(y.replace(/,/g, ``))
  const stripPlusMinusAndPercentageAndParseFloat = (z) => parseFloat(z.substr(1, z.length - 1))
  const stripWordsAndMakeItGood = (a) => parseInt(a.substr(0, a.length - ` runs sampled)`.length))
  const datum = data.split(`\n`)
    .filter((x) => x.indexOf(`±`) > -1)
    .map((x) => x
      .split(`x `)
      .map((y) => y.trim())
    )
    .map(([x, y]) => [x, ...y.split(` ops/sec `)])
    .map(([x, y, z]) => [x, stripCommasAndParseInt(y), ...z.split(` (`)])
    .map(([x, y, z, a]) => [
      x,
      y,
      stripPlusMinusAndPercentageAndParseFloat(z),
      stripWordsAndMakeItGood(a)
    ])
    .sort(byOpsPerSecond)
  console.log(datum)
})
/* eslint-enable */
