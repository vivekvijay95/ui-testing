const cart = require("./cart")
const ItemInCart = require("./item-in-cart")
class TShirt {
  constructor(name) {
    this.name = name;
  }

  findTShirt() {
    let allTShirts = $$("div.card.card-body");
    allTShirts.some(tShirt => {
      let productName = tShirt.$("p").getText()
      this.tShirt = tShirt;
      return productName.trim() === this.name.trim()
    });
    return this;
  }

  addToCart() {
    this.findTShirt();
    this.tShirt.$("button").click();
    let itemInCart = new ItemInCart(this.name);
    cart.addItemToCurrentCartList(this.name, itemInCart)
    return this;
  }
}

module.exports = TShirt