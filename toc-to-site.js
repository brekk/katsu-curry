#!/usr/bin/env node

const rs = require(`replacestream`)
const fs = require(`fs`)
const path = require(`path`)
const args = require(`minimist`)(process.argv.slice(2))

const dir = (x) => path.join(__dirname, x)
const source = dir(Array.prototype.slice.call(process.argv, -1)[0])

fs.createReadStream(source)
  .pipe(rs(`### Table of Contents`, `<div class="toc">\n<h3>Table of Contents</h3>`))
  .pipe(rs(`## $`, `</div>\n\n## $`))
  .pipe(process.stdout)
