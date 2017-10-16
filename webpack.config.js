module.exports = {
  resolve: {
    extensions: [`.js`, `.json`],
    modules: [
      `${__dirname}/node_modules`
    ],
    alias: {
      "@combinators": `${__dirname}/src/combinators`,
      "@params": `${__dirname}/src/params`,
      "@fp": `${__dirname}/src/fp`,
      "@object": `${__dirname}/src/object`,
      "@placeholder": `${__dirname}/src/placeholder`,
      "@utils": `${__dirname}/src/utils`
    }
  }
}
