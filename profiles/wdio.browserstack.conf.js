const merge = require("deepmerge");
const wdioConf = require("./wdio.conf");

exports.config = merge(wdioConf.config, {
  // =============================================================
  // To run on browser stack, use this settings
  hostname: "hub-cloud.browserstack.com",
  // port: 4444,

  // =================
  // Service Providers
  // =================
  // WebdriverIO supports Sauce Labs, Browserstack, and Testing Bot (other cloud providers
  // should work too though). These services define specific user and key (or access key)
  // values you need to put in here in order to connect to these services.
  //
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  maxInstances: 10,

  capabilities: [
    {
      browserName: "Chrome",
      browser_version: "83.0",
      os: "Windows",
      os_version: "10",
      resolution: "1024x768",
      'browserstack.selenium_version': '3.5.2',
      name: "Windows - Chrome 83",
      "browserstack.local": "true",
      "acceptSslCerts": "true",
    },
    {
      os: "OS X",
      os_version: "High Sierra",
      browserName: "Safari",
      browser_version: "11.0",
      name: "Mac OSX - Safari 11",
      "browserstack.local": "true",
      "acceptSslCerts": "true",
    },
    // {
    //   browserName: "iPhone 11 Pro Max",
    //   device: "iPhone 11 Pro Max",
    //   realMobile: "true",
    //   os_version: "13",
    //   name: "iPhone 11 Pro Max",
    //   "browserstack.appium_version": "1.17.0",
    //   "browserstack.local": "true",
    //   "acceptSslCerts": "true",
    // },
    // {
    //   browserName: "android",
    //   device: "Samsung Galaxy S9 Plus",
    //   realMobile: "true",
    //   os_version: "9.0",
    //   name: "Samsung Galaxy S9 Plus",
    //   "browserstack.appium_version": "1.17.0",
    //   "browserstack.local": "true",
    //   "acceptSslCerts": "true",
    // },
    // {
    //   os: "Windows",
    //   os_version: "10",
    //   browserName: "Firefox",
    //   browser_version: "71.0",
    //   name: "Windows - Firefox 71.0",
    //   "browserstack.local": "true",
    //   "acceptSslCerts": "true"
    // }
  ]
});
