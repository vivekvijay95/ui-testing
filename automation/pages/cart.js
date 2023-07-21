const Page = require("./page");
class CartPage extends Page {
  cartSummary = require("./cart-summary");
  currentItems = {};

  addItemToCurrentCartList(name, item) {
    this.currentItems[name] = item;
  }

  getCurrentItemsInCart() {
    return this.currentItems;
  }

  getItemByName(name) {
    return this.currentItems[name];
  }

  getCurrentTotalItemsFromScreen() {
    return this.cartSummary.refeshCartSummary().getTotalItems();
  }

  getCurrentTotalPaymentFromScreen() {
    return this.cartSummary.refeshCartSummary().getTotalPayment();
  }

  clearCart() {
    this.cartSummary.clearCart();
  }

  checkout() {
    this.cartSummary.checkout();
  }

  shouldEmpty() {
    this.cartSummary.shouldDisappear();
  }

  verifyCheckoutMessage(message) {
    expect($("//p[text()='" + message + "']")).toBeDisplayed();
  }
}
module.exports = new CartPage();
