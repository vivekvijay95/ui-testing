const { Given, When, Then } = require("cucumber");
const cartPage = require("../pages/cart");

Given("User is on shopcart page", () => {
  cartPage.navigateToHomePage()
});

Then("User clears cart", () => {
  cartPage.clearCart();
});
