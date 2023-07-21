const context = require(process.cwd() + "/config/context");
const report = require(process.cwd() + "/automation/utils/report");
const common = require('./common')
const uniRestPromise = common.uniRestPromise
const reportData = report.extractAllResults();
const config = context["testrail"];
const suiteId = config["project"]["suiteId"];
const dateformat = require("dateformat");
const unirest = require("unirest");
const fs = require("fs");
const defaultTimeStamp = dateformat(new Date(), "dd/mm/yyyy, h:MM:ss TT");
const host = config["host"];
const url = "https://" + host + "/index.php";
const projectName = config["project"]['name'];
const authorization =
  "Basic " + new Buffer.from(process.env.TESTRAIL_USER + ":" + process.env.TESTRAIL_KEY).toString("base64");
const headers = {
  Authorization: authorization,
  "Content-Type": "application/json"
};
const formHeaders = {
  Authorization: authorization,
  "Content-Type": "multipart/form-data"
};

const getTestRunName = () => {
  var configuredName = process.env.RELEASE_DEFINITIONNAME + " - " + process.env.BUILD_BUILDNUMBER + " - " + process.env.ENV;
  var defaultName = `Automation Regression ${defaultTimeStamp}​​​​​​​​​`;
  return process.env.RELEASE_DEFINITIONNAME != undefined ? configuredName : defaultName;
};

const getRuns = async projectId => {
  console.log("Getting all test runs from project that has Id " + projectId);
  var path = `/api/v2/get_runs/${projectId}`;
  var query = {};
  query[path] = "";
  return requestGET(query);
};

const getRun = async (testRunName, projectId) => {
  let runs = await getRuns(projectId);
  for (var run of runs) {
    if (run.name == testRunName) {
      console.log("Found test run with name: " + testRunName);
      return run;
    }
  }
  console.log("Could not find test run with name: " + testRunName);
};

const createRun = async (name, projectId, caseIds) => {
  console.log("Creating test run with name: " + name);
  let path = `/api/v2/add_run/${projectId}`;
  let query = {};
  query[path] = "";
  let payload = {};
  payload["name"] = name;
  payload["include_all"] = false;
  payload["case_ids"] = caseIds;
  payload["suite_id"] = suiteId;
  return requestPOST(query, payload);
};

const addResultForCase = async (runId, caseId, statusId, comment) => {
  console.log("Adding result for case " + caseId);
  let path = `/api/v2/add_result_for_case/${runId}/${caseId}`;
  let query = {};
  query[path] = "";
  let payload = {};
  payload["status_id"] = statusId;
  payload["comment"] = comment;
  return requestPOST(query, payload);
};

const addAttachment = async (resultId, attachment) => {
  console.log("Attaching the screenshot to test result");
  let query = {};
  let path = `/api/v2/add_attachment_to_result/${resultId}`;
  query[path] = "";
  return await requestATT(query, attachment);
};

const getProjects = async () => {
  console.log("Getting all project");
  let query = { "/api/v2/get_projects": "" };
  return requestGET(query);
};

const getProject = async () => {
  console.log(projectName);
  var projects = await getProjects();
  for (var project of projects) {
    if (project.name == projectName) return project;
  }
};

const getProjectId = async () => {
  console.log("Getting project ID...");
  var project = await getProject();
  return project.id;
};

const requestGET = async query => {
  return await uniRestPromise(unirest.get(url)
    .headers(headers)
    .query(query))
};

const requestPOST = async (query, payload) => {
  return await uniRestPromise(unirest
    .post(url)
    .headers(headers)
    .query(query)
    .send(payload))
};

const requestATT = async (query, attachment) => {
  return await uniRestPromise(unirest
    .post(url)
    .headers(formHeaders)
    .query(query)
    .field("attachment", fs.createReadStream(attachment))
  )
};

const start = async () => {
  let testRunName = getTestRunName();
  console.log(testRunName);
  let projectId = await getProjectId();
  let run = await getRun(testRunName, projectId);
  if (run == undefined) {
    run = await createRun(testRunName, projectId, reportData.keys);
  }
  let runId = run.id;
  let allKeys = Object.keys(reportData["tests"]);
  for (var key of allKeys) {
    let tests = reportData["tests"][key];
    for (var test of tests) {
      let result = await addResultForCase(
        runId,
        key,
        test.result.state,
        JSON.stringify(test, null, 4)
      );
      var attachment = test.screen;
      if (attachment != undefined) {
        let att = await addAttachment(result.id, attachment);
        console.log(att);
      }
    }
  }
};

module.exports = {
  start: start()
};
