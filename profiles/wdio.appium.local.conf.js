const merge = require("deepmerge");
const wdioConf = require("./wdio.conf");
exports.config = merge(wdioConf.config, {
  // debug: true,
  // execArgv: ['--inspect-brk=127.0.0.1:5859'],
  // =============================================================
  // To run on locally using selenuim standalone, use this settings
  // hostname: '127.0.0.1',
  // port: 4444,
  // path: '/wd/hub',
  // ======================
  // Services Configuration
  // ======================

  port: 4723,
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 10,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [
    {
      // The defaults you need to have in your config
      browserName: "safari",
      platformName: "iOS",
      "appium:deviceName": "iPhone X",
      "appium:platformVersion": "12.2",
      "appium:automationName": "XCUITest",
      "appium:newCommandTimeout": 240,
      "appium:useNewWDA": true,
      "appium:autoAcceptAlerts": true,
      "appium:autoDismissAlerts": true,
      showXcodeLog: true
    }
    // {
    //     // The defaults you need to have in your config
    //     platformName: 'Android',
    //     browserName: 'chrome',
    //     maxInstances: 1,
    //     // For W3C the appium capabilities need to have an extension prefix
    //     // http://appium.io/docs/en/writing-running-appium/caps/
    //     // This is `appium:` for all Appium Capabilities which can be found here
    //     'appium:deviceName': 'emulator-5554',
    //     'appium:platformVersion': '9',
    //     'appium:orientation': 'PORTRAIT',
    //     // `automationName` will be mandatory, see
    //     // https://github.com/appium/appium/releases/tag/v1.13.0
    //     'appium:automationName': 'UiAutomator2',
    //     'appium:newCommandTimeout': 240,
    //     // 'goog:chromeOptions': {
    //     //     w3c: true,
    //     //     // Add this option to prevent the annoying "Welcome"-message
    //     //     args: [ '--no-first-run' ],
    //     // },
    // }
  ],
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter.html
  reporters: ["spec"]
});
