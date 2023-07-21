class ItemInCart {
  constructor(name) {
    this.name = name;
  }

  findItemInCart() {
    this.itemInCart = undefined;
    let allItemsInCart = $$("div.row.no-gutters.py-2");
    allItemsInCart.forEach((item) => {
      let itemName = item.$("h5").getText();
      if (itemName.trim().toUpperCase() === this.name.trim().toUpperCase()) {
        this.itemInCart = item;
        return this;
      }
    });
    return this;
  }

  deleteFromCart() {
    console.log("Deleting item " + this.name + " ...");
    while (this.isItemAvailableInCart()) {
      this.itemInCart.$("button.btn-danger").click();
    }
  }

  increaseItemBy(num) {
    console.log("Increasing product " + this.name + " by " + num);
    if (this.isItemAvailableInCart()) {
      let i;
      for (i = 0; i < num; i++) {
        this.itemInCart.$("button.btn-primary").click();
      }
    } else {
      console.log(`Item ${this.name} is not available in cart`);
    }
  }

  descreaseItemBy(num) {
    console.log("Decreasing product " + this.name + " by " + num);
    if (this.isItemAvailableInCart()) {
      let i;
      for (i = 0; i < num; i++) {
        this.itemInCart.$("button.btn-danger").click();
      }
    } else {
      console.log(`Item ${this.name} is not available in cart`);
    }
  }

  currentQuantity() {}

  isItemAvailableInCart() {
    this.findItemInCart();
    if (this.itemInCart === undefined) return false;
    return this.itemInCart.isExisting() && this.itemInCart.isDisplayed();
  }
}

module.exports = ItemInCart;
