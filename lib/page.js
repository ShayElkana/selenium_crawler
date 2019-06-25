const {Builder, By, until} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
// o.addArguments('start-fullscreen');
o.addArguments('disable-infobars');
//o.addArguments('headless'); // running test on visual chrome browser
o.setUserPreferences({ credential_enable_service: false });

var Page = function() {
    this.driver = new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
        .build();

    // visit a webpage
    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };

    // quit current session
    this.quit = async function() {
        return await this.driver.quit();
    };

    // wait and find a specific element with it's id
    this.findById = async function(id) {
        await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
        return await this.driver.findElement(By.id(id));
    };

    // wait and find a specific element with it's name
    this.findByName = async function(name) {
        await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
        return await this.driver.findElement(By.name(name));
    };

    // wait and find a specific element with it's name
    this.findByTagName = async function(name) {
        // await this.driver.wait(until.elementLocated(By.tagName(name)), 15000, 'Looking for elements');
        return await this.driver.findElements(By.tagName(name));
    };

    this.findByCss = async function(css) {
        await this.driver.wait(until.elementLocated(By.css(css)), 15000, 'Looking for element');
        return await this.driver.findElement(By.css(css));
    };
    this.getDriver = () => {
        return this.driver
    }
    this.getDocument = async function() {
        return await this.driver.executeScript(() => {
            return document
        })
    }
    this.executeScript = async function(script) {
        return await this.driver.executeScript(script);
    };

    // wait and find a specific element with it's name
    this.removeAllScript = async () => {
        return await this.driver.executeScript(() => {
            setTimeout(() => {
                document.querySelectorAll('script').forEach(e => e.remove())
            }, 100)
        })
    }

    this.takeScreenShot = async () => {
        const data = await this.driver.takeScreenshot()
        const base64Data = `data:image/png;base64,${data}`
        return base64Data
    }
    // fill input web elements
    this.write = async function (el, txt) {
        return await el.sendKeys(txt);
    };



};

module.exports = Page;