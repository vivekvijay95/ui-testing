const context = require(process.cwd() + "/config/context");
const url = context["env"][process.env.ENV]["url"];
const web = require("../utils/web");
// const assert = require("assert");
// const ItemInCart = require("./item-in-cart");
class Page {
  navigateToHomePage() {
    browser.url(url);
  }
  navigateToCart() {
    //use these two lines when running without docker
    var cartButton = $("a[href$='/cart']");
    cartButton.click();
    //when using docker uncomment this
    // browser.url(url.replace(/\/?$/, "") + "/cart");
  }

  getUrl() {
    return url;
  }

  getContext() {
    return context;
  }

  getData() {
    return context.data;
  }

  getWeb() {
    return web;
  }
}

module.exports = Page;
