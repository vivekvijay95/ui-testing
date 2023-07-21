class Web {
  /**
   * To solve the problem of unable to input the text correct into input fields in some browsers
   * @param {*} element
   * @param {*} text
   */
  inputText(element, text) {
    if (text == undefined) return;
    browser.waitUntil(
      () => {
        element.waitForEnabled();
        element.waitForDisplayed();
        element.clearValue();
        text.split("").forEach((c) => {
          element.addValue(c);
        });
        return element.getValue() == text;
      },
      {
        interval: 1000,
        timeoutMsg: "Cannot input a text into element",
      }
    );
  }

  jsClick(element) {
    browser.execute("arguments[0].click();", element);
  }

  clickOnButtonWithText(button) {
    var ele = $('//button[text()="' + button + '"]');
    ele.click();
  }
}

module.exports = new Web();
