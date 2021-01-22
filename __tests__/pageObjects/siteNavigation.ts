import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
  } from "selenium-webdriver";

  import { AutomatedElement } from "./index"

  export class SiteNavigation extends AutomatedElement {
      index: number;
      array: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      constructor() {
          super();
      }

        testArray() {
            this.index = 0;
            for(let i = 1; i <= 2; i++) {
                for(let j = 0; j <= 10; j++) {
                    let a = this.array[this.index % 11];
                    this.index += i;
                    let b = this.array[this.index % 11];
                    console.log( '%i  %i', a, b);
                }
                console.log("");
            }
        }


  }