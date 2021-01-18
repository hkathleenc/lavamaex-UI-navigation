import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
  } from "selenium-webdriver";

  import { AutomatedElement } from "./index"
  import { Button } from "./index"

  export class PinboardButton extends Button {
      locator: By = By.css('#tkf-body > div > div > div.viewerArea__nav.ng-scope > div > div > div.navbar-collapse.collapse > div > ul > li.viewer__navbar__fullSwitcher > div > a:nth-child(3)');
      constructor() {
          super();
      }
  }