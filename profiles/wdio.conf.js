const bs = require(process.cwd() + "/automation/utils/bs");
const fs = require('fs-extra')
require('global-agent/bootstrap')
const browserstack = require('browserstack-local');

exports.config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  //
  // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
  // on a remote machine).
  runner: "local",

  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: ["./automation/features/**/*.feature"],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: "error",
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner, @wdio/lambda-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/applitools-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,

  // Reports
  reporters: [
    "spec",
    [
      "junit",
      {
        outputDir: "./reports/junit/",
        outputFileFormat: function (options) {
          // optional
          return `results-${options.cid}.${options.capabilities.browserName}.xml`;
        }
      }
    ],
    [
      "json",
      {
        outputDir: "./reports/json",
        outputFileFormat: function (options) {
          return `results-${options.cid}.${options.capabilities.browserName}.json`;
        }
      }
    ],
    [
      'allure', 
      {
        outputDir: './reports/allure-results',
        // disableWebdriverStepsReporting: true,
        // disableWebdriverScreenshotsReporting: true,
      }
    ]
  ],
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 30000,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 0,

  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: "cucumber",
  //
  // The number of times to retry the entire specfile when it fails as a whole
  specFileRetries: 0,
  //
  //
  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    require: ["./automation/step_definitions/**/*.js"], // <string[]> (file/dir) require files before executing features
    backtrace: false, // <boolean> show full backtrace for errors
    requireModule: [], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    dryRun: false, // <boolean> invoke formatters without executing steps
    failFast: false, // <boolean> abort the run on first failure
    format: ["pretty"], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true, // <boolean> disable colors in formatter output
    snippets: true, // <boolean> hide step definition snippets for pending steps
    source: true, // <boolean> hide source uris
    profile: [], // <string[]> (name) specify the profile to use
    strict: false, // <boolean> fail if there are any undefined or pending steps
    tagExpression: "not @ignore", // <string> (expression) only execute the features or scenarios with tags matching the expression
    timeout: 120000, // <number> timeout for step definitions
    ignoreUndefinedDefinitions: false // <boolean> Enable this config to treat undefined definitions as warnings.
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function (config, capabilities) {
    if (process.env.ENV == undefined) {
      process.env.ENV = 'test'
    }
    const { removeSync } = require("fs-extra");
    removeSync("./reports/json");
    removeSync("./reports/junit");
    if (bs.isBs() && config.hostname == "hub-cloud.browserstack.com") {
      console.log("Connecting local");
      return new Promise(function (resolve, reject) {
        exports.bs_local = new browserstack.Local();
        exports.bs_local.start({
          'key': process.env.BROWSERSTACK_ACCESS_KEY,
          'forceLocal': 'true',
          // 'forceProxy': 'true',
          'proxyHost': process.env.PROXY_HOST,
          'proxyPort': process.env.PROXY_PORT,
          'verbose': 3
        }, function(error) {
          if (error) return reject(error);
          console.log('Connected. Now testing...');
          resolve();
        });
      });
    }

  },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  beforeSession: function (config, capabilities, specs) {
    if (bs.isBs() && config.hostname == "hub-cloud.browserstack.com") {
      capabilities.project = "Member Portal V5";
      if (bs.isPipeline()) {
        capabilities.build = `${process.env.BUILD_DefinitionName} - ${process.env.BUILD_BuildNumber}`;
      } else {
        let user = require("os").userInfo().username;
        capabilities.build = `Local Development Build - ${user}`;
      }
    }
  },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  // before: function (capabilities, specs) {
  // },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Runs before a Cucumber feature
   */
  beforeFeature: function (uri, feature, scenarios) {
    browser.maximizeWindow();
  },
  /**
   * Runs before a Cucumber scenario
   */
  beforeScenario: function (uri, feature, scenario, sourceLocation) {
    if (bs.isBs() && browser.config.hostname == "hub-cloud.browserstack.com") {
      bs.updateName(browser.sessionId, scenario.name);
    }
  },
  /**
   * Runs before a Cucumber step
   */
  // beforeStep: function (uri, feature) {
  // },
  /**
   * Runs after a Cucumber step
   */
  afterStep: function (uri, feature, { error, result }) {
    if (error) {
      browser.takeScreenshot();
    }
  },
  /**
   * Runs after a Cucumber scenario
   */
  afterScenario: async function (
    uri,
    feature,
    scenario,
    result,
    sourceLocation
  ) {
    console.log("AFTER scenario: " + scenario.name);
    if (bs.isBs() && browser.config.hostname == "hub-cloud.browserstack.com") {
      await bs.updateStatus(browser.sessionId, result.status);
    }

    if (result.status != "passed") {
      let dir = "./reports/json/screens/";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      let report = require(process.cwd() + "/automation/utils/report");
      await browser.saveScreenshot(
        `${dir}/${scenario.name}-${report.screenshootName(browser.capabilities)}`
      );
    }
  },
  /**
   * Runs after a Cucumber feature
   */
  // afterFeature: function (uri, feature, scenarios) {
  // },

  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: async function (exitCode, config, capabilities, results) {
    console.log("Release name: " + process.env.RELEASE_DEFINITIONNAME)
    console.log("Build number: " + process.env.BUILD_BUILDNUMBER)
    console.log("Env: " + process.env.ENV)
    if (process.env.RELEASE_DEFINITIONNAME != undefined && process.env.BUILD_BUILDNUMBER != undefined){
      console.log("Updating results to TestRail")
      let testrail = require(process.cwd() + "/automation/utils/testrail")
      await testrail.start;
    }

    if (bs.isBs() && config.hostname == "hub-cloud.browserstack.com") {
      exports.bs_local.stop(function () { });
      return new Promise(function (resolve, reject) {
        exports.bs_local.stop(function (error) {
          if (error) return reject(error);
          console.log('Stoped');
          resolve();
        });
      });
    }
  
  }
  /**
   * Gets executed when a refresh happens.
   * @param {String} oldSessionId session ID of the old session
   * @param {String} newSessionId session ID of the new session
   */
  //onReload: function(oldSessionId, newSessionId) {
  //}
};
