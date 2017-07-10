
module.exports = {
  url() {
    return `${this.api.launchUrl}/`;
  },
  elements: {
    main: {
      selector: '#roles-page',
    },
  },
  commands: [{
    ssr() {
      return this.waitForElementPresent('@main');
    },
  }],
};
