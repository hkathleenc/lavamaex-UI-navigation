import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
  } from "selenium-webdriver";

  import { 
      AutomatedElement,
    } from "./index"

  export class SiteNavigation extends AutomatedElement {
    index: number;
    homeURL: string = "https://lavamaex.org";
    header: By = By.css('div.Header-inner.Header-inner--top');
    constructor() {
        super();
    }

    async navigateHome() {
        await this.driver.get(this.homeURL);
        await this.driver.wait(
          until.elementIsVisible(await this.getElement(this.header))
        );
    }
  }