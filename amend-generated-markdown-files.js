#!/usr/bin/env node

const rs = require(`replacestream`)
const fs = require(`fs`)
const path = require(`path`)
const args = require(`minimist`)(process.argv.slice(2))
const {_} = args
const [rawSource] = _

const dir = (x) => path.join(__dirname, x)
const source = dir(rawSource)

const rules = {
  // wrap the table of contents heading with a .toc div
  openTOC: rs(
    `### Table of Contents`,
    `<div class="toc">\n<h3>Table of Contents</h3>`
  ),
  // prepend the first title with the ending of the .toc div
  closeTOC: rs(
    `## $`,
    `</div><!--end .toc-->\n\n## $`
  ),
  // singular is preferable
  thereIsOnlyOneExample: rs(`**Examples**`, `**Example**`)
}

const {values} = Object

const amendGeneratedMarkdownFiles = (stream, rulez) => values(rulez)
  .reduce(
    (ze, rule) => ze.pipe(rule),
    stream
  ).pipe(
    process.stdout
  )

// fs.createReadStream(source)
//   .pipe(rules.openTOC)
//   .pipe(rules.closeTOC)
//   .pipe(rules.thereIsOnlyOneExample) // zero spoons, though
//   .pipe(process.stdout)

amendGeneratedMarkdownFiles(fs.createReadStream(source), rules)
