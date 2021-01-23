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
      locator: By = By.xpath('//*[@id="tkf-body"]/div/div/div[2]/div/div/div[3]/div/ul/li[4]/div/a[1]');
      constructor() {
          super();
      }
  }