/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: `Katsu Curry`,
    image: `test-site/img/logo.svg`,
    infoLink: `https://github.com/brekk/katsu-curry`,
    pinned: true
  }
]

const siteConfig = {
  projectName: `katsu-curry`,
  organizationName: `brekk`,
  title: `🍛`, /* title for your website */
  tagline: `curry for your functions`,
  url: `https://brekk.github.io/katsu-curry`, /* your website url */
  baseUrl: `/`, /* base url for your project */
  headerLinks: [
    {doc: `API`, label: `API`},
    {doc: `API-in-debug-mode`, label: `Debug-mode`},
    {page: `help`, label: `Help`}
  ],
  users,
  /* path to images for header/footer */
  headerIcon: `img/logo.svg`,
  footerIcon: `img/logo.svg`,
  favicon: `img/favicon.png`,
  /* colors for website */
  colors: {
    primaryColor: `#cc0000`,
    secondaryColor: `#000000`
  },
  /* custom fonts for website */
  /* fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  }, */
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    `Copyright © ` +
    new Date().getFullYear() +
    ` Brekk Bockrath`,
  // organizationName: 'deltice', // or set an env variable ORGANIZATION_NAME
  // projectName: 'katsu-curry', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: `default`
  },
  scripts: [`https://buttons.github.io/buttons.js`],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: `https://github.com/brekk/katsu-curry`
}

module.exports = siteConfig
