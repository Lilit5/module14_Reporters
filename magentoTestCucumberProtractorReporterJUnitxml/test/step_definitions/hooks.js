"use strict";
const { After, Status } = require('cucumber');
const { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);

After(async function (testCase) {
    if (testCase.result.status === Status.FAILED) {
        const screenShot = await browser.takeScreenshot();
        let decodedImage = new Buffer(screenShot, 'base64');
        return this.attach(decodedImage, 'image/png');
    }
    const screenShot = await browser.takeScreenshot();
    let decodedImage = new Buffer(screenShot, 'base64');
    return this.attach(decodedImage, 'image/png');
});