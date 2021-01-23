import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
} from "selenium-webdriver"; 
import { Driver, Options } from "selenium-webdriver/chrome";

import { textChangeRangeIsUnchanged } from "typescript";

import {
    SiteNavigation,
} from "./pageObjects/index"

import * as navButtons from "./data/header_data.json"

describe("Header Navigation Buttons Work", () => {
    const page = new SiteNavigation();
    beforeAll(async () => {
        await page.navigate(navButtons[0].destURL);
      // maximize?
    });
    afterAll(async () => {
        page.driver.quit();
    });
    let index = 0;
    let prev = 0;
    let length = navButtons.length;
    let curURL;
    let goalURL: string = "";
    let navButtonBy: By;
    let caseString: string = "";
    for(let i = 1; i <= length - 1; i++) {
        for(let j = 0; j <= length - 1; j++) {
            prev = index;
            index += i;
            navButtonBy = By.xpath(navButtons[index % length].buttonXPath);
            caseString = `Click: '${navButtons[index % length].buttonName}' button on 
                                '${navButtons[prev % length].destPage}' Page. 
                                Leads to: '${navButtons[index % length].destPage}' Page.`;

            test(caseString, async () => {
                // Click button:
                await page.getElement(navButtonBy);
                await page.click(navButtonBy);
                await page.sleep(3000);
                // Update comparison URL strings
                curURL = await page.driver.getCurrentUrl();
                goalURL = navButtons[index % length].destURL;
                expect(curURL).toBe(goalURL);
            });
            if(curURL != goalURL) {
                // navigate to destURL
                page.navigate(navButtons[index % length].destURL);
            }
        }
    }
});