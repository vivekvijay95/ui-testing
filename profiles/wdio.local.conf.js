const merge = require("deepmerge");
const wdioConf = require("./wdio.conf");
const drivers = {
  chrome: { version: "latest" }
};

exports.config = merge(wdioConf.config, {
  // =============================================================
  // To run on locally using selenuim standalone, use this settings
  hostname: "127.0.0.1",
  port: 4444,
  path: "/wd/hub",

  // ======================
  // Services Configuration
  // ======================
  // Use service selenium-standalone if running scripts locally
  services: [
    [
      "selenium-standalone",
      {
        logPath: "logs",
        installArgs: { drivers },
        args: { drivers }
      },
    ],
  ],

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
      // maxInstances can get overwritten per capability. So if you have an in-house Selenium
      // grid with only 5 firefox instances available you can make sure that not more than
      // 5 instances get started at a time.
      maxInstances: 5,
      //
      browserName: "chrome",
      "goog:chromeOptions": {
        // to run chrome headless the following flags are required
        // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
        useAutomationExtension: false,
      },
      // If outputDir is provided WebdriverIO can capture driver session logs
      // it is possible to configure which logTypes to include/exclude.
      // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
      // excludeDriverLogs: ['bugreport', 'server'],
    },
    //
    //Uncomment Below
    // 
    // {
    //   // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    //   // grid with only 5 firefox instances available you can make sure that not more than
    //   // 5 instances get started at a time.
    //   maxInstances: 5,
    //   browserName: "firefox",
    // },
    // {
    //   maxInstances: 5,
    //   browserName: 'safari'
    // }
  ],
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter.html
  
});
