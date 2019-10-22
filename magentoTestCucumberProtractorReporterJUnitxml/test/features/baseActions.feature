@all
Feature: Login and Simple Product creation 

    @login
    Scenario: Verify user can login successfully if already not logged in 
        Given I open "BasePage"
        Then I should be on page "LoginPage"
        And I fill "admin" in "Username" field
        And I fill "lilit1234" in "Password" field
        And I click "Sign in" button
        Then I should be on page "BasePage"

    @failForScreenshot
    Scenario: This is scenario will fail to check the screenshot taking mechanism
        Given I open "ProductsGridPage"
        And I click "Product Type Toggle" button
        And I wait visibility of "NonExisting Element"

    @createSimpleProduct
    Scenario Outline: Crate Simple Product
        Given I open "ProductsGridPage"
        And I click "Product Type Toggle" button
        And I wait visibility of "Simple Product"
        And I click "Simple Product"
        Then I should be on page "ProductEditPage"
        And I wait visibility of "Product Name"
        And I fill "<Name>" in "Product Name" field
        And I fill "<Price>" in "Product Price" field
        And I click "Save" button
        And I wait "3" seconds

        Examples:
            |Name            |Price |
            |simple_product1 |123 |
            |simple_product2 |124 |
            |simple_product3 |125 |