/**
 * Author: Helen Cunningham
 * 01/18/21
 */

 import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
  } from "selenium-webdriver";

  import { AgendaButton, AutomatedElement } from "./index"
  import { Button } from "./index"

  export class CalPage extends AutomatedElement {
      ag_button: AgendaButton;
    
     
      constructor() {
          super();
      }
  }