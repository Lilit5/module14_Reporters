"use strict";
let {Then, When, Given} = require('cucumber');
const expect = require('chai').expect;
const elementHelper = require('../utils/stepFunctions.js').getPageObjectElement;
const urlHelper = require('../utils/stepFunctions.js');
const stepFunctions = require('../utils/stepFunctions.js');
const logger = require('../../config/loggerConfig.js').logger;

Then(/^"([^"]*)" should( not)? be visible$/, async (alias, notArg) => {
    notArg = notArg ? ' not' : '';
    logger.info(`${alias} should${notArg} be visible`);
    let element = elementHelper(alias);
    let result = await element.isPresent();
    return expect(result).to.be.equal(!notArg);
});

Then(/^Count of "([^"]*)" should( not)? be "([^"]*)"$/, async (alias, notArg, expectedNumber) => {
    notArg = notArg ? ' not' : '';
    let element = elementHelper(alias);
    let result = await element.count();
    expectedNumber = parseInt(expectedNumber);
    logger.info(`Count of ${alias} should${notArg} be ${expectedNumber}`);
    if (notArg) {
        return expect(result).to.not.equal(expectedNumber);   
    }
    else {
        return expect(result).to.equal(expectedNumber);
    }
});

Then(/^Current url should( not)? be equal to "([^"]*)" url$/, async (notArg, url) => {
    notArg = notArg ? ' not' : '';
    console.log(url+" --------------------------");
    const currentUrl = await browser.getCurrentUrl();
    logger.info(`Page url should${notArg} be ${url}`);
    if (notArg) {
        return expect(currentUrl).not.to.be.equal(url);
    }
    else {
        return expect(currentUrl).to.be.equal(url);
    }
});

Then(/^I should be on page "([^"]*)"$/, async (pageName) => {
    let currentUrl = await browser.getCurrentUrl();
    let expectedUrl = urlHelper.getPageNameByUrl(currentUrl);
    if (currentUrl !== expectedUrl) {
        browser.params.currentPage = pageName;
    } else {
        throw "Wrong current url, expected: '" + expectedUrl + "' actual: '" + currentUrl + "'." 
    }

});