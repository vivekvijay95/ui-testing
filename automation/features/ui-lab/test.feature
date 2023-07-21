Feature: Add Product to Cart and Clear Cart

Background:
  * configure driver = { type: 'chrome' }

Scenario: [C1] Add product into cart and add one more and click checkout
  Given driver 'http://localhost:3000'
  And waitFor('#root')
  ## creating a variable with x path of "Buffalo - Striploin" from the webpage // //*[@id="root"]/main/div/div[2]/div[1]/div/div/div/div[2]/h5
  When def elementXPath = '//*[@id="root"]/main/div/div[2]/div[2]/div[1]/p'
  ##creating a variable for xpath of add to cart button
  And def buttonXPath = '//*[@id="root"]/main/div/div[2]/div[2]/div[1]/div/button'
  ##Clicking the Buffalo - Striploin" from the webpage
  And script('document.evaluate(`' + elementXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
  ##Clicking the add to cart buttion for  - Buffalo - Striploin" from the webpage
  And script('document.evaluate(`' + buttonXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
  ####Opening the cart page
  And driver 'http://localhost:3000/cart'
  ##waiting for the cart page to be open
  And waitFor('#root')
  ###Variable for "+" button in the cart page 
  And def cartButtonXPath = '//*[@id="root"]/main/div/div[2]/div[1]/div[1]/div/div/div[4]/button[1]
  ###Variable for Checkout button
  And def checkoutbuttonXPath2 = '//*[@id="root"]/main/div/div[2]/div[2]/div/div/button[1]'
  And script('document.evaluate(`' + cartButtonXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
  And script('document.evaluate(`' + checkoutbuttonXPath2 + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
  #And waitFor('#Cart-Conformation')


Scenario: [C1] Add product into cart and clear the cart
    Given driver 'http://localhost:3000'
    And waitFor('#root')
    When def elementXPath = '//*[@id="root"]/main/div/div[2]/div[2]/div[1]/p'
    And def buttonXPath = '//*[@id="root"]/main/div/div[2]/div[2]/div[1]/div/button'
    And def checkoutXPath = '//*[@id="root"]/main/div/div[2]/div[2]/div/div/button[1]'
    And script('document.evaluate(`' + elementXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
    And script('document.evaluate(`' + buttonXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
    And driver 'http://localhost:3000/cart'
    And waitFor('#root')
    And def cartButtonXPath = '//*[@id="root"]/main/div/div[2]/div[1]/div[1]/div/div/div[4]/button[1]'
    ##creating a variable to clear the cart    
    And def clearbuttonXPath2 = '//*[@id="root"]/main/div/div[2]/div[2]/div/div/button[2]'
    And script('document.evaluate(`' + cartButtonXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
    ###Clicking the clear button from cart page
    And script('document.evaluate(`' + clearbuttonXPath2 + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
  #   And script('document.evaluate(`' + addXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')


Scenario: [C1] Adding two item to the cart
    Given driver 'http://localhost:3000'
    And waitFor('#root')
    ## creating a variable with x path of "Buffalo - Striploin" from the webpage // //*[@id="root"]/main/div/div[2]/div[1]/div/div/div/div[2]/h5
    When def elementXPath = '//*[@id="root"]/main/div/div[2]/div[2]/div[1]/p'
    ##creating a variable for xpath of add to cart button
    And def buttonXPath = '//*[@id="root"]/main/div/div[2]/div[2]/div[1]/div/button'
    ## Creating variable for Bacardi Breexer - Tropical
    When def bacardiXPath = '//*[@id="root"]/main/div/div[2]/div[2]/div[2]/p'
    ##creating a variable for xpath of add to bacardicart button
    And def bacardibuttonXPath = '//*[@id="root"]/main/div/div[2]/div[2]/div[2]/div/button'     
    ##Clicking the Buffalo - Striploin" from the webpage
    And script('document.evaluate(`' + elementXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
    ##Clicking the add to cart buttion for  - Buffalo - Striploin" from the webpage
    And script('document.evaluate(`' + buttonXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
    ##Clicking the Bacardi Breexer - Tropical" from the webpage
    And script('document.evaluate(`' + bacardiXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
    ##Clicking the add to cart buttion for  - Bacardi Breexer - Tropical" from the webpage
    And script('document.evaluate(`' + bacardibuttonXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
    ####Opening the cart page
    And driver 'http://localhost:3000/cart'
    ##waiting for the cart page to be open
    And def cartButtonXPath = '//*[@id="root"]/main/div/div[2]/div[1]/div[1]/div/div[1]/div[4]/button[1]'
    And script('document.evaluate(`' + cartButtonXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
    And script('document.evaluate(`' + cartButtonXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
    * delay(10000)
    #And waitFor('#Cart-Conformation')
    Then def expectedValue = '$375.25'
    And def actualValue = script('document.evaluate(`//*[@id="root"]/main/div/div[2]/div[2]/div/h3`, document, null, XPathResult.STRING_TYPE, null).stringValue')
    And match actualValue == expectedValue
    Then def expectedValue1 = '4'
    And def actualValue1 = script('document.evaluate(`//*[@id="root"]/main/div/div[2]/div[2]/div/h4`, document, null, XPathResult.STRING_TYPE, null).stringValue')
    And match actualValue1 == expectedValue1
    #And waitFor('#Cart-Conformation')
    And def deccartButtonXPath = '//*[@id="root"]/main/div/div[2]/div[1]/div[1]/div/div[1]/div[4]/button[2]'
    And script('document.evaluate(`' + deccartButtonXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
    And script('document.evaluate(`' + deccartButtonXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
    * delay(10000)
    Then def expectedValue2 = '$297.03'
    And def actualValue2 = script('document.evaluate(`//*[@id="root"]/main/div/div[2]/div[2]/div/h3`, document, null, XPathResult.STRING_TYPE, null).stringValue')
    And match actualValue2 == expectedValue2
    Then def expectedValue3 = '2'
    And def actualValue3 = script('document.evaluate(`//*[@id="root"]/main/div/div[2]/div[2]/div/h4`, document, null, XPathResult.STRING_TYPE, null).stringValue')
    And match actualValue3 == expectedValue3
    * delay(10000)
    And def deleteButtonXPath = '//*[@id="root"]/main/div/div[2]/div[1]/div[1]/div/div[2]/div[4]/button[2]'
    And script('document.evaluate(`' + deleteButtonXPath + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
    * delay(10000)
    ###Variable for Checkout button
    And def checkoutbuttonXPath2 = '//*[@id="root"]/main/div/div[2]/div[2]/div/div/button[1]'
    And script('document.evaluate(`' + checkoutbuttonXPath2 + '`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()')
    And waitFor('#Cart-Conformation')

  
