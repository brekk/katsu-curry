const React = require(`react`)
const cwd = process.cwd()
const benchmarkData = require(`${cwd}/static/generated-benchmark`) // if this fails, re-run `nps docs.reserve`
const {
  MarkdownBlock,
  Container,
  GridBlock
} = require(`../../core/CompLibrary`)

const Logo = require(`${cwd}/core/Logo`)

const siteConfig = require(`${cwd}/siteConfig.js`)

function imgUrl(img) {
  return siteConfig.baseUrl + `img/` + img
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + `docs/` + (language ? language + `/` : ``) + doc
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + `/` : ``) + page
}

const Button = ({href = ``, target = ``, children}) => {
  return (
    <div className="pluginWrapper buttonWrapper">
      <a className="button" href={href} target={target}>
        {children}
      </a>
    </div>
  )
}

Button.defaultProps = {
  target: `_self`
}

const SplashContainer = (props) => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
)

const ProjectTitle = () => (
  <h2 className="projectTitle">
    <span>{siteConfig.title}</span>
    <Logo primary="#ef0505" secondary="#ffffff" className="logo mega"/>
    <small>
      {
        siteConfig.tagline.split(` `).map(
          (x, i) => <span className={`word-${i + 1}`} key={i}>{x}</span>
        )
      }
    </small>
  </h2>
)

const PromoSection = (props) => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
)

const HomeSplash = ({language = ``}) => (
  <SplashContainer>
    <div className="inner">
      <ProjectTitle />
      <PromoSection>
        <Button href="https://npm.runkit.com/katsu-curry">Try It Out</Button>
        <Button href={docUrl(`API.html`, language)}>API</Button>
        <Button href={docUrl(`API-with-debug.html`, language)}>Debug-mode</Button>
      </PromoSection>
    </div>
  </SplashContainer>
)

const Block = (props) => {
  const {children} = props
  const kids = children.map((x, i) => {
    x.key = i
    return x
  })
  const {
    padding = [`bottom`, `top`],
    id,
    background,
    align = `center`
  } = props
  return (
    <Container
      padding={padding}
      id={id}
      background={background}>
      <GridBlock align={align} contents={kids} layout={props.layout} />
    </Container>
  )
}

const Details = () => (
  <Block layout="threeColumn">
    {[
      {
        content: `
\`\`\`js
import {curry} from 'katsu-curry'
const add = curry((a, b, c) => a + b + c)
add(1,2,3)
add(1,2)(3)
add(1)(2)(3)
\`\`\``,
        // image: imgUrl(`logo.svg`),
        // imageAlign: `top`,
        title: `Deal with parameters at your leisure`
      },
      {
        content: `
\`\`\`js
import {curry, $} from 'katsu-curry'
// $ is also aliased to PLACEHOLDER
const divide = curry((a,b) => a / b)
divide(2) // of limited utility
divide(2)(3) // 2/3
divide($,2)(3) // 3/2
\`\`\``,
        // image: imgUrl(`logo.svg`),
        // imageAlign: `top`,
        title: `Use the placeholder to skip parameters`
      },
      {
        content: `
\`\`\`js
import {curry} from 'katsu-curry/debug'
const over = (a,b) => a / b // named functions are useful!
const divide = curry(over)
divide(2).toString() // curry(over)(2)(?)
divide(2)(3) // 2/3
divide($,2).toString() // curry(over)(🍛,2)(?)
\`\`\``,
        // image: imgUrl(`logo.svg`),
        // imageAlign: `top`,
        title: `Use debug mode for additional clarity`
      },
      {
        content: `
\`\`\`js
import {curryObjectN} from 'katsu-curry'
const threeKeyProps = curryObjectN(3, Object.keys)
threeKeyProps({a: 1, b: 2, c: 3}) // ['a', 'b', 'c']
const oneMore = threeKeyProps({a: 1, b: 2}) // function expecting one more param
const encase = (x) => ({[x]: x})
'cdefghi'.split('').map(encase).map(oneMore)
/*
[ [ 'a', 'b', 'c' ],
  [ 'a', 'b', 'd' ],
  [ 'a', 'b', 'e' ],
  [ 'a', 'b', 'f' ],
  [ 'a', 'b', 'g' ],
  [ 'a', 'b', 'h' ],
  [ 'a', 'b', 'i' ] ]
*/
\`\`\``,
        title: `Use object-mode with a specific arity`
      },
      {
        content: `
\`\`\`js
import {curryObjectK} from 'katsu-curry'
const abc = curryObjectK(['a', 'b', 'c'], Object.values)
abc({a: 1, b: 2, c: 3}) // [1, 2, 3]
const oneMore = abc({a: 1, b: 2}) // function expecting "c"
const encase = (x) => ({[x]: x})
'cdefghi'.split('').map(encase).map(oneMore)
/*
[ [ 1, 2, 3 ],
  function,
  function,
  function,
  function,
  function,
  function ]
*/
\`\`\``,
        title: `Use object-mode with specific keys`
      }
    ]}
  </Block>
)

const Features = () => (
  <div
    className="features-n-shit"
  >
    <h2>Features</h2>
    <Block layout="threeColumn">
      {[
        {
          key: `one`,
          content: `
  * Traditional parameter currying:
    - \`curry\`
  * Object-style currying:
    - \`curryObjectK\`
    - \`curryObjectN\`
    - \`curryObjectKN\`
          `
          // image: imgUrl(`logo.svg`),
          // imageAlign: `top`,
        },
        {
          key: `two`,
          content: `
  * Partial application with any combination of arguments:
    - \`$\` or \`PLACEHOLDER\`
  * Utilities
    - for remapping parameters: \`remap\` and \`remapArray\`
    - for function composition: \`pipe\` and \`compose\`
    - for function constants: \`K\`
    - for functional identity: \`I\`
          `
        },
        {
          key: `three`,
          content: `
  * An outrageously useful debug-mode&trade;
    - add clarity when things aren&rsquo;t working (at the cost of speed)
    - \`import debug from 'katsu-curry/debug'\`
    - or <span title="in the dirty pre-es6 world">\`require('katsu-curry/debug')\`</span>
          `
        }
      ]}
    </Block>
  </div>
)

const Showcase = ({language}) => {
  if ((siteConfig.users || []).length === 0) {
    return null
  }
  const showcase = siteConfig.users
    .filter((user) => {
      return user.pinned
    })
    .map((user, i) => (
        <a href={user.infoLink} key={i}>
          <img src={user.image} title={user.caption} />
        </a>
      )
    )

  return (
    <div className="productShowcaseSection">
      <h2>{`Who's Using This?`}</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl(`users.html`, language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  )
}
// <LearnHow />
// <TryOut />
// <Description />
// <Showcase language={language} />

const objectifiedData = benchmarkData.map(([name, ops, variance, samples]) => ({
  name,
  ops,
  variance,
  samples
}))

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `,`)
}

const countSlashes = (x) => x.split(``).reduce((a, b) => b === `/` ? a + 1 : a, 0)

const getNPMLink = (title) => {
  const hashMark = title.indexOf(`#`)
  const dotMark = title.indexOf(`.`)
  const privateMark = title.indexOf(`@`) > -1
  if (hashMark > -1) {
    title = title.slice(0, hashMark)
  }
  if (dotMark > -1) {
    title = title.slice(0, dotMark)
  }
  const slashes = countSlashes(title)
  if (!privateMark && slashes > 0) {
    title = title.slice(0, title.indexOf(`/`))
  }
  return `//npmjs.org/package/${title}`
}

const Benchpress = ({name, ops, variance, samples}) => (
  <tr key={name}>
    <td>
      <a href={getNPMLink(name)} className="module">
        {name}
      </a>
      {name.indexOf(`katsu`) > -1 && <b title="this library!" className="this-library"/>}
    </td>
    <td>{numberWithCommas(ops)}</td>
    <td>{variance}</td>
    <td>{samples}</td>
  </tr>
)

const byOpsPerSecond = ({ops}, {ops: ops2}) => ops >= ops2 ? -1 : 1

const Benchmark = () => (
  <div className="benchmark">
    <h2 id="benchmark">Benchmark</h2>
    <table>
      <thead title="sorted by speed!">
        <tr>
        <td>{`module (function)`}</td>
        <td>ops / second</td>
        <td>variance</td>
        <td>samples</td>
        </tr>
      </thead>
      <tbody>
        {
          // eslint-disable-next-line fp/no-mutating-methods
          objectifiedData.sort(byOpsPerSecond).map(Benchpress)
        }
      </tbody>
    </table>
    <span className="benchmark__info">
      Feel free to re-run the benchmark code <a href="//github.com/brekk/katsu-curry/blob/master/src/benchmark.fixture.js">here </a>
      or submit a <a href="https://github.com/brekk/katsu-curry/pulls">PR</a>!
    </span>
  </div>
)
/* eslint-disable max-len */
const AnIntro = () => (
  <Container id="introduction" align="left">
    <Block align="left" layout="twoColumn">{[
      {
        key: `currying`,
        content: `
[Currying](//fr.umio.us/favoring-curry/) is a technique for taking a function which expects multiple parameters into one which, when supplied with [fewer parameters](${docUrl(`API.html#curry`)}) (or [other expectations](${docUrl(`API.html#curryObjectN`)})) returns a new function that awaits the remaining ones.`
      },
      {
        key: `this-library`,
        content: `
This library provides solutions for [traditional curry](${docUrl(`API.html#curry`)}), specifying a [number of keys for object-style curry](${docUrl(`API.html#curryObjectK`)}) (as originated by the [\`fpo\`](//npmjs.org/package/fpo) and [this book](https://leanpub.com/fljs)) as well as a (currently underwhelming in performance) [explicit-key object-style curry](${docUrl(`API.html#curryObjectK`)}).

Additionally, similarly to [other libraries](#benchmark) in the space, this library provides a "placeholder" value which can be used to [omit a parameter](${docUrl(`API-in-debug-mode.html`)}) in partial-application.
`
      }
    ]}
    </Block>
  </Container>
)
/* eslint-enable max-len */

const Index = ({language = ``}) => (
  <div>
    <HomeSplash language={language} />
    <div className="mainContainer">
      <AnIntro />
      <Features />
      <Details />
      <Benchmark />
    </div>
  </div>
)

module.exports = Index
