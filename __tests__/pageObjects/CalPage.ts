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

 import { 
    AutomatedElement,
    AgendaButton,
    PinboardButton,
    MonthlyButton  
  } from "./index"


  export class CalPage extends AutomatedElement {
      ag_button: AgendaButton;
      pin_button: PinboardButton;
      month_button: MonthlyButton;
    
     
      constructor() {
          super();
      }
  }