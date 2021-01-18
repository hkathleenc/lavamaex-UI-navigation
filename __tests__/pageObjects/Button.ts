import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
  } from "selenium-webdriver";

import {AutomatedElement} from "./index"

export class Button extends AutomatedElement {
    // Button's locator
    locator: By;
    constructor() {
        super();
    }

    /**
     * Returns the button element using its built-in locator.
     */
    async getElement(): Promise<WebElement> {
        await this.driver.wait(until.elementLocated(this.locator));
        let element = await this.driver.findElement(this.locator);
        await this.driver.wait(until.elementIsVisible(element));
        return element;
    }

    /**
     * clicks the button after waiting for it
     */
    async click(): Promise<void> {
        let element = await this.getElement();
        await this.driver.wait(until.elementIsEnabled(element));
        return await element.click();
    }

      /**
     * returns the button's text after waiting for it to be visible
     */
    async getText(): Promise<string> {
        let element = await this.getElement();
        await this.driver.wait(until.elementIsEnabled(element));
        return element.getText();
    }

}