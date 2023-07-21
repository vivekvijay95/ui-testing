const { Given, When, Then } = require("cucumber");
const storePage = require("../pages/store");

When(/^User add "([^"]*)" product to cart$/, (product) => {
  storePage.addProductByName(product);
});

