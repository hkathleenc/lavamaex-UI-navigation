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
    AgendaButton,
    PinboardButton,
    MonthlyButton,
    CalPage,
    SiteNavigation,
    NavButton
} from "./pageObjects/index"

import * as navButtons from "./data/demo_data.json"



describe("Early stages work", () => {
    const page = new SiteNavigation();
    beforeAll(async () => {
        await page.navigate(navButtons[0].destURL);
      // maximize?
    });
    afterAll(async () => {
        page.driver.quit();
    });
        let index = 0;
        let array: number[] = [0, 1, 2];
        // let index = 0;
        // Checking array indices
        for(let i = 1; i <= array.length - 1; i++) {
            for(let j = 0; j <= array.length - 1; j++) {
                let a = array[index % array.length];
                index += i;
                let b = array[index % array.length];
                console.log( '%i  %i', a, b);
            }
            console.log(navButtons[i].buttonName);
        }
        // Checking process without automation (string confirmation)
        
        console.log("Navigating to destURL of first button");
        for(let i = 1; i <= navButtons.length - 1; i++) {
            for(let j = 0; j <= navButtons.length - 1; j++) {
                prev = index;
                index += i;
                console.log(`navigating from ${navButtons[prev % length].destPage} to ${navButtons[index % length].destPage}.`);
            }
            console.log("")
        }
        let index = 0;
        let prev = 0;
        let length = navButtons.length;
        let curURL;
        let goalURL: string = "";
        let navButtonBy: By;
        let caseString: string = "";
        console.log("Navigated to destURL of navButtons[0]")
        for(let i = 1; i <= length - 1; i++) {
            for(let j = 0; j <= length - 1; j++) {
                prev = index;
                index += i;
                navButtonBy = By.xpath(navButtons[index % length].buttonXPath);

                console.log(`navigating from ${navButtons[prev % length].destPage} to 
                            ${navButtons[index % length].destPage}.`);
                
                caseString = `Click: '${navButtons[index % length].buttonName}' button on 
                                '${navButtons[prev % length].destPage}' Page. 
                                Leads to: '${navButtons[index % length].destPage}' Page.`;

                test(caseString, async () => {
                    // Click button:
                    await page.getElement(navButtonBy);
                    await page.click(navButtonBy);
                    // Update comparison URL strings
                    curURL = await page.driver.getCurrentUrl();
                    goalURL = navButtons[index % length].destURL;
                    expect(curURL).toBe(goalURL);
                });
                if(curURL != goalURL) {
                    console.log("Failsafe: navigating to destURL after failed test.")
                    // navigate to destURL
                    page.navigate(navButtons[index % length].destURL);
                }
            }
        }


        

    
        let whoWeAre:By = By.xpath("//a[@class='Header-nav-item' and text()='Who We Are']");
        let impact:By = By.xpath("//a[@class='Header-nav-item' and text()='Impact']");
        let homeLogo: By = By.xpath("//a[@class='Header-branding']");
        let programs: By = By.xpath("//a[@class='Header-nav-item' and text()='Programs']");
        let howToHelp: By = By.xpath("//a[@class='Header-nav-item' and text()='How To Help']");
        
        let press: By = By.xpath("//a[@class='Header-nav-item' and text()=Press]");
        let login: By = By.xpath("//a[@class='Header-nav-item' and text()='Log In']");
        let contactUs: By = By.xpath("//a[@class='Header-nav-item' and text()='Contact Us']")
        let donate: By = By.xpath("//a[@class='Header-nav-item' and text()='Donate']");
        
    
        
        await page.getElement(whoWeAre);
        await page.click(whoWeAre);

        let secondUrl = await page.driver.getCurrentUrl();
        expect(secondUrl).toContain("https://lavamaex.org/who-we-are");
        

});