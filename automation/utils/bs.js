const BROWSERSTACK_URL = "https://api.browserstack.com/automate";
const unirest = require("unirest");
const common = require('./common');
const uniRestPromise = common.uniRestPromise;
const authorization =
  "Basic " +
  new Buffer.from(
    process.env.BROWSERSTACK_USERNAME +
    ":" +
    process.env.BROWSERSTACK_ACCESS_KEY
  ).toString("base64");
const headers = {
  Authorization: authorization,
  "Content-Type": "application/json"
};
const updateSession = (sessionId, payload) => {
  return uniRestPromise(
    unirest
      .put(`${BROWSERSTACK_URL}/sessions/${sessionId}.json`)
      .headers(headers)
      .send(payload));
};
const updateName = (sessionId, name) => {
  console.log(`Updating session name ${sessionId} ==> ${name}`);
  return updateSession(sessionId, { name: name });
};
const updateStatus = async (sessionId, status) => {
  console.log(`Updating session status ${sessionId} ==> ${status}`);
  await updateSession(sessionId, { status: status });
};

const isBs = () => {
  return process.env.BROWSERSTACK_USERNAME != undefined && process.env.BROWSERSTACK_ACCESS_KEY != undefined
}

const isPipeline = () => {
  return process.env.BUILD_DefinitionName != undefined && process.env.BUILD_BuildNumber != undefined
}

module.exports = {
  updateName: updateName,
  updateStatus: updateStatus,
  isBs: isBs,
  isPipeline : isPipeline
};