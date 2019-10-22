Magento testing tool

Magento is an open-source e-commerce platform written in PHP. This tool is designed to test Magento basic functionality.

Getting Started
* Clone this repository
* npm install to install all required dependencies


Run Tests
To run tests:
1. run 'npm run test' command
    If you want to run a test by its name then:
        * run 'npm run test -- --tag "@<test name>"' command (available tags are @login @createProduct @failForScreenshot @all)

Changes added to the project according to the module 14 home task

1. Configured your framework to save test run results in a JSON file.
2. Added ability to create html report on geerated JSON file.
3. Cucumber-pretty is used in framework.
4. A junit xml report is generating after test execution. 
