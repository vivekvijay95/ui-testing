const fs = require("fs");

// http://www.yaoyuyang.com/2017/01/20/nodejs-batch-file-processing.html

fs.readdirAsync = dirname => {
  return new Promise(function(resolve, reject) {
    fs.readdir(dirname, function(err, filenames) {
      if (err) {
        reject(err);
      } else {
        resolve(filenames);
      }
    });
  });
};

fs.readFileAsync = (filename, enc) => {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, enc, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

fs.analyseResult = tests => {
  var result = {};
  var state = [];
  var error = "";
  tests.forEach(function(test) {
    state.push(test.state);
    if (test.standardError != undefined) {
      error = error + test.standardError;
    }
  });
  if (state.includes("failed") || state.includes("skipped")) {
    result["state"] = 5;
  } else if (state.includes("passed")) {
    result["state"] = 1;
  }
  result["error"] = error;
  return result;
};

fs.extractAllResults = () => {
  const reportDir = process.cwd() + "/reports/json";
  var files = fs.readdirSync(reportDir);
  var results = {};
  results["keys"] = [];
  results["tests"] = {};
  for (var file of files) {
    if (
      file.includes(".json") &&
      fs.lstatSync(`${reportDir}/${file}`).isFile()
    ) {
      let rawdata = fs.readFileSync(`${reportDir}/${file}`);
      if (rawdata != "") {
        let report = JSON.parse(rawdata);
        for (var test of report.suites) {
          if (test.name.startsWith("[C")) {
            var testId = parseInt(
              test.name
                .split("-")[0]
                .replace("[", "")
                .replace("]", "")
                .replace("C", "")
            );
            if (!results["keys"].includes(testId)) results["keys"].push(testId);
            if (!results["tests"][testId]) {
              results["tests"][testId] = [];
            }
            var testDetails = {};
            testDetails["name"] = test.name;
            testDetails["browser"] = report.capabilities.browserName;
            testDetails["browserVersion"] =
              report.capabilities.browserVersion || report.capabilities.version;
            testDetails["platformName"] =
              report.capabilities.platformName || report.capabilities.platform;
            testDetails["result"] = fs.analyseResult(test.tests);
            var screenshot = `${reportDir}/screens/${test.name}-${fs.screenshootName(report.capabilities)}`;
            if (fs.existsSync(screenshot)) {
              testDetails["screen"] = screenshot;
            }
            results["tests"][testId].push(testDetails);
          }
        }
      }
      
    }
  }
  return results;
};

fs.screenshootName = capabilities => {
  let option = "";
  let platform =
    capabilities.platformName != undefined
      ? capabilities.platformName
      : capabilities.platform;
  if (capabilities.browserVersion != undefined)
    option = option + "-" + capabilities.browserVersion;
  if (platform != undefined) option = option + "-" + platform;
  if (capabilities.deviceName != undefined)
    option = option + "-" + capabilities.deviceName;
  if (capabilities.deviceModel != undefined)
    option = option + "-" + capabilities.deviceModel;
  if (capabilities.deviceManufacturer != undefined)
    option = option + "-" + capabilities.deviceManufacturer;
  return `${capabilities.browserName}${option}.png`;
};

module.exports = fs;
