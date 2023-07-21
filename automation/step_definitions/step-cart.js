const { Given, When, Then } = require("cucumber");
const cartPage = require("../pages/cart");
const expectChai = require("chai").expect;

Then(/^User should see the "([^"]*)" product in cart$/, (product) => {
  cartPage.navigateToCart();
  cartPage.getCurrentTotalItemsFromScreen();
  expect(cartPage.getItemByName(product).isItemAvailableInCart());
});

Then(/^User should see "([^"]*)" item in cart$/, (noOfItems) => {
  expectChai(cartPage.getCurrentTotalItemsFromScreen()).to.equal(noOfItems);
});

Then(/^Total value of the cart should be "([^"]*)"$/, (value) => {
  expectChai(cartPage.getCurrentTotalPaymentFromScreen()).to.equal(value);
});

Then(/^Cart should be empty$/, () => {
  cartPage.shouldEmpty();
});

Then(
  /^User increase quantity of "([^"]*)" by (-?\d+)$/,
  (product, quantity) => {
    cartPage.getItemByName(product).increaseItemBy(quantity);
  }
);

Then(
  /^User decrease quantity of "([^"]*)" by (-?\d+)$/,
  (product, quantity) => {
    cartPage.getItemByName(product).descreaseItemBy(quantity);
  }
);

Then(
  /^"([^"]*)" button should be displayed for "([^"]*)" product$/,
  (buttonType, product) => {
    cartPage.verifyButtonsForProduct(buttonType, product);
  }
);

Then(/^User deletes the "([^"]*)" product$/, (product) => {
  cartPage.getItemByName(product).deleteFromCart();
});

Then(/^User should see "([^"]*)" message$/, (message) => {
  cartPage.verifyCheckoutMessage(message);
});

Then("User checkouts", () => {
  cartPage.checkout();
});
