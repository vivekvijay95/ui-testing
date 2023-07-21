class CartSummary {
  refeshCartSummary() {
    let cards = $$("div.card");
    if (cards.length > 1) {
      this.cartSummary = cards[1];
    }

    if (this.cartSummary !== undefined) {
      let totalItem = this.cartSummary.$("h4");
      if (totalItem.isExisting()) {
        this.totalItem = totalItem.getText();
      }
      let totalPaymnet = this.cartSummary.$("h3");
      if (totalPaymnet.isExisting()) {
        this.totalPaymnet = totalPaymnet.getText();
      }
    }
    return this;
  }

  getTotalItems() {
    console.log(`Current total items in cart: ${this.totalItem}`)
    return this.totalItem
  }

  getTotalPayment() {
    console.log(`Current total payment in cart: ${this.totalPaymnet}`)
    return this.totalPaymnet
  }

  clearCart() {
    let clearBtn = this.cartSummary.$("//button[text()='CLEAR']")
    clearBtn.waitForClickable();
    clearBtn.click();
  }

  checkout() {
    let checkoutBtn = this.cartSummary.$("//button[text()='CHECKOUT']")
    checkoutBtn.waitForClickable();
    checkoutBtn.click();
  }

  shouldDisappear() {
    expect(this.cartSummary).not.toBeDisplayed()
  }



}

module.exports = new CartSummary();
