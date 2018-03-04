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
    <Logo primary="#ef0505" className="logo mega"/>
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
        <Button href={docUrl(`api.html`, language)}>API</Button>
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

const Features = () => (
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
      }
    ]}
  </Block>
)

const FeatureCallout = () => (
  <div
    className="productShowcaseSection"
  >
    <h2>Features</h2>
    <ul className="features">
      <li>Traditional parameter currying</li>
      <li>Object-style currying</li>
      <li>
        <span>The parameter placeholder <code>$</code></span>
        <ul className="features sub">
          <li>for partial application with any combination of arguments</li>
        </ul>
      </li>
      <li>A (completely-objective) super-useful debug-mode&trade;</li>
      <li>
        <span>Utilities</span>
        <ul className="features sub">
          <li>for remapping parameters</li>
          <li>for function composition</li>
          <li>for functional constants <code>K</code></li>
          <li>for functional identity <code>I</code></li>
        </ul>
      </li>
    </ul>
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
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} title={user.caption} />
        </a>
      )
    })

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

const Index = ({language = ``}) => (
  <div>
    <HomeSplash language={language} />
    <div className="mainContainer">
      <Features />
      <FeatureCallout />
    </div>
  </div>
)

module.exports = Index
