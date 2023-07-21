const config = require("config-yml");

class Context {
  constructor() {
    this.config = config;
  }

  get testrail() {
    return config.testrail;
  }

  get env() {
    return config.env;
  }

  get data() {
    return config[`data-${[process.env.ENV]}`];
  }
}

var context = new Context();

module.exports = {
  testrail: context.testrail,
  env: context.env,
  data: context.data
};
