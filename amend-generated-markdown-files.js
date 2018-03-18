#!/usr/bin/env node

const rs = require(`replacestream`)
const fs = require(`fs`)
const path = require(`path`)
const args = require(`minimist`)(process.argv.slice(2))

const dir = (x) => path.join(__dirname, x)
const source = dir(Array.prototype.slice.call(process.argv, -1)[0])

fs.createReadStream(source)
  // wrap the table of contents heading with a .toc div
  .pipe(rs(
    `### Table of Contents`,
    `<div class="toc">\n<h3>Table of Contents</h3>`
  ))
  // prepend the first title with the ending of the .toc div
  .pipe(rs(
    `## $`,
    `</div><!--end .toc-->\n\n## $`)
  )
  // singular is preferable
  .pipe(rs(`**Examples**`, `**Example**`))
  .pipe(process.stdout)
