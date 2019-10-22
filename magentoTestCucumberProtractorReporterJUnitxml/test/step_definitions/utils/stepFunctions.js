const EC = protractor.ExpectedConditions;
const magentPO = require('../../po/magentoPageObject.json');
const pageUrls = require('../../po/magentoPageUrls.json')
const logger = require('../../config/loggerConfig.js').logger;
    let getPageObjectElement = (alias) => {
        let currentPage = browser.params.currentPage;
        let pageElement = magentPO[currentPage][alias];
        if (pageElement["xpath"] === true) {
            if (pageElement['isCollection'] === true) {
                pageElement = element.all(by.xpath(pageElement.selector));
            }
            else {
                pageElement = element(by.xpath(pageElement.selector));
            }
        }
        else {
            if (pageElement['isCollection'] === true) {
                pageElement = element.all(by.css(pageElement.selector));
            }
            else {
                pageElement = element(by.css(pageElement.selector));
            }
        }
        return pageElement;        
    };

    let getUrlByPageName = (pageName) => {
        let page = pageUrls[pageName];
        return page["url"]
    };

    let getPageNameByUrl = (url) => {
        let page = Object.keys(pageUrls).find(page => pageUrls[page].url === url);
        if (page) {
            return page;
        }
        else {
            page = Object.keys(pageUrls).find(page => url.includes(pageUrls[page].url.toString()));
            if(!page)
                throw "A page by '" + url + "' url was not found"
        }
    }

    let expectedCondition = (shouldBe) => {
        let expectedConditionFunction;
    
        switch (shouldBe) {
            case "present":
                expectedConditionFunction = EC.presenceOf.bind(EC);
                break;
            case "clickable":
                expectedConditionFunction = EC.elementToBeClickable.bind(EC);
                break;
            case "visible":
                expectedConditionFunction = EC.visibilityOf.bind(EC);
                break;
            case "invisible":
                expectedConditionFunction = EC.invisibilityOf.bind(EC);
                break;
            case "selected":
                expectedConditionFunction = EC.elementToBeSelected.bind(EC);
                break;
            case "gone":
                expectedConditionFunction = EC.stalenessOf.bind(EC);
                break;
            default:
                logger.error(`Wrong expected condition provided: [${shouldBe}]`);
                throw new Error('Wrong expected condition provided.');
        }
        return expectedConditionFunction;
    };

    let highlightElement = (alias) => {
        let styleOptions = "color: Red; border: 2px solid red;";
        let webElement = getPageObjectElement(alias).getWebElement();
        return browser.executeScript("arguments[0].setAttribute('style', arguments[1]);", webElement, styleOptions).then(() => {
            return browser.wait(() => {
                return getPageObjectElement(alias).getCssValue('border').then((border) => {
                    return border.toString().indexOf('2px solid rgb(255,') > -1;
                });
            }, 5000, 'Style is not applied!');
        }, (error)=> {
            loggers.error('Error is: ' + error);
        });
    };

    module.exports = {
        getPageObjectElement,
        getUrlByPageName,
        getPageNameByUrl,
        expectedCondition,
        highlightElement
    }