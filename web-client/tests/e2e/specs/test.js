// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  // 'default e2e tests': browser => {
  //   browser
  //     .init()
  //     .waitForElementVisible('#app')
  //     .assert.elementPresent('.hello')
  //     .assert.containsText('h1', 'Welcome to Your Vue.js App')
  //     .assert.elementCount('img', 1)
  //     .end()
  // },

  'login test': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL + 'login')
      .waitForElementVisible('#app', 3000)
      .assert.textContains('h1', 'TaskAgile')
      .end()
  }
}
