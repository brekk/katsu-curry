const React = require(`react`)
const {Container, GridBlock} = require(`../../core/CompLibrary`)
const Help = () => {
  const supportLinks = [
    {
      title: `Browse Docs`,
      content: `This site documents both the [standard API](/docs/API.html) as well as the [API for debug-mode](/docs/API-with-debug-mode).`
    },
    {
      title: `Join the community`,
      content: `Feel free to [ask questions](//github.com/brekk/katsu-curry/issues) and [offer help](//github.com/brekk/katsu-curry/pulls).`
    },
    {
      title: `Stay up to date`,
      content: `Find out what's [new](//github.com/brekk/katsu-curry/pulse/monthly) with this project.`
    }
  ]

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h2>Need help?</h2>
          </header>
          <p>This project is currently primarily maintained a single dedicated person &mdash; please feel free to contribute!</p>
          <GridBlock contents={supportLinks} layout="threeColumn" />
        </div>
      </Container>
    </div>
  )
}

module.exports = Help
