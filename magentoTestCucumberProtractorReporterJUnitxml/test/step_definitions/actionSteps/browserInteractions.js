const { When } = require('cucumber');
const elementHelper = require('../utils/stepFunctions.js').getPageObjectElement;
const urlHelper = require('../utils/stepFunctions.js').getUrlByPageName;
const highlightElement = require('../utils/stepFunctions.js');
const logger = require('../../config/loggerConfig.js').logger;
const EC = protractor.ExpectedConditions;

When (/^I wait "([^"]*)" seconds$/, (waitTime) => {
    logger.info(`I wait ${waitTime} seconds`);
    return browser.sleep(waitTime * 1000);
});

When (/^I wait visibility of "([^"]*)"$/, (elementName) => {
    let element = elementHelper(elementName);
    logger.info(`I wait element '${elementName}' to be visible`);
    return browser.wait(EC.visibilityOf(element), 5000);
});

When(/^I open "([^"]*)"$/, async (pageName) => {
    let url = urlHelper(pageName);
    browser.params.currentPage = pageName;
    logger.info(`I open ${url} url`);
    return await browser.get(url);
});

When(/^I highlight "([^"]*)"$/, (alias) => {
    logger.info(`I highlight ${alias}`);
    return highlightElement(alias);
});

When(/^I fill "([^"]*)" in "([^"]*)" field/, (keys, field) => {
    logger.info(`I fill "${keys}" in field ${field}`);
    return elementHelper(field).sendKeys(keys);
});

When(/^I click "([^"]*)" button/, async (buttonName) => {
    logger.info(`I click "${buttonName}" button`);
    return await elementHelper(buttonName).click();
});