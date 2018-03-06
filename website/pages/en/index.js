const React = require(`react`)

const {
  MarkdownBlock,
  Container,
  GridBlock
} = require(`../../core/CompLibrary`)

const Logo = require(process.cwd() + `/core/Logo`)

const siteConfig = require(process.cwd() + `/siteConfig.js`)

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
        <Button href="#try">Try It Out</Button>
        <Button href={docUrl(`explanation.html`, language)}>Read More</Button>
        <Button href={docUrl(`API.html`, language)}>API</Button>
      </PromoSection>
    </div>
  </SplashContainer>
)

const Block = (props) => (
  <Container
    padding={[`bottom`, `top`]}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
)

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
  * A (completely objectively) super-useful debug-mode&trade;
    - \`import debug from 'katsu-curry/debug'\`
    - or <span title="in the dirty pre-es6 world">\`require('katsu-curry/debug')\`</span>
          `
        }
      ]}
    </Block>
  </div>
)

const LearnHow = () => (
  <Block background="light">
    {[
      {
        content: `Talk about learning how to use this`,
        image: imgUrl(`logo.svg`),
        imageAlign: `right`,
        title: `Learn How`
      }
    ]}
  </Block>
)

const TryOut = () => (
  <Block id="try">
    {[
      {
        content: `Talk about trying this out`,
        image: imgUrl(`logo.svg`),
        imageAlign: `left`,
        title: `Try it Out`
      }
    ]}
  </Block>
)

const Description = () => (
  <Block background="dark">
    {[
      {
        content: `This is another description of how this project is useful`,
        image: imgUrl(`logo.svg`),
        imageAlign: `right`,
        title: `Description`
      }
    ]}
  </Block>
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

const benchmarkData = [
  [ `katsu-curry #curryObjectN`, 9467349, 5.69, 73 ],
  [ `@ibrokethat/curry`, 9168538, 6.9, 74 ],
  [ `lodash/fp/curry`, 8873327, 4.29, 76 ],
  [ `instant-curry`, 7059247, 4.83, 70 ],
  [ `ramda/src/curry`, 6498465, 4.62, 71 ],
  [ `katsu-curry #curry`, 6083741, 6.39, 67 ],
  [ `just-curry-it`, 4601812, 4.89, 74 ],
  [ `light-curry`, 3925772, 5.05, 71 ],
  [ `katsu-curry/debug #curryObjectN`, 3679708, 6.08, 73 ],
  [ `bloody-curry`, 3174576, 3.21, 77 ],
  [ `fjl-curry`, 3066417, 5.52, 70 ],
  [ `dead-simple-curry`, 2823668, 5.66, 72 ],
  [ `curri`, 2634989, 4.64, 77 ],
  [ `curry`, 2246712, 5.29, 70 ],
  [ `fj-curry`, 1834610, 6.94, 69 ],
  [ `curry-d`, 1573489, 6.73, 70 ],
  [ `auto-curry`, 1343690, 3.79, 74 ],
  [ `katsu-curry #curryObjectK`, 1159314, 5.7, 73 ],
  [ `fpo.curry`, 945169, 4.4, 74 ],
  [ `katsu-curry/debug #curry`, 867879, 5.75, 70 ],
  [ `fpo.curryMultiple`, 840026, 3.42, 76 ],
  [ `@riim/curry`, 444138, 7.84, 64 ],
  [ `katsu-curry/debug #curryObjectK`, 178968, 5.35, 71 ]
]

const objectifiedData = benchmarkData.map(([name, ops, variance, samples]) => ({
  name,
  ops,
  variance,
  samples
}))

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `,`)
}

const Benchpress = ({name, ops, variance, samples}) => (
  <tr key={name}>
    <td>
      <a href="#" className="module">
        {name}
      </a>
      {name.indexOf(`katsu`) > -1 && <b className="this"/>}
    </td>
    <td>{numberWithCommas(ops)}</td>
    <td>{variance}</td>
    <td>{samples}</td>
  </tr>
)

const byOpsPerSecond = ({ops}, {ops: ops2}) => ops >= ops2 ? -1 : 1

const Benchmark = () => (
  <div className="benchmark">
    <h1>Benchmark</h1>
    <table className="features">
      <thead>
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
  </div>
)

const Index = ({language = ``}) => (
  <div>
    <HomeSplash language={language} />
    <div className="mainContainer">
      <Features />
      <Details />
      <Benchmark />
    </div>
  </div>
)

module.exports = Index
