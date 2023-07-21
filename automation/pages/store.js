const Page = require("./page");
const TShirt = require("./tshirt")
class Store extends Page {
  addProductByName(product) {
    console.log("Adding " + product + " into cart...")
    let tShirt = new TShirt(product);
    tShirt.addToCart();
  }
}

module.exports = new Store();
