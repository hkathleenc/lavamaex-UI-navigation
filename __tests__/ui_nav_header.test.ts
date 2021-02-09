/*
Author: Helen Cunningham

This program tests whether header and footer links navigate to their correct pages. 

It accepts data from a .JSON file containing information representing UI navigation buttons.

The buttons are represented with the following data:
    1. The button's xPath
    2. The button's destination URL
    3. The button's displayed name ("Home", "Who We Are". etc.)
    4. The name of the destination page (this is usually the same as the button's displayed name, 
           but not always.)

The program creates tests simulating a user navigating:
    TO each accepted button's destination page, 
    FROM every other accepted button's destination page.

Example: 
The input file contains buttons for a home page, an about page, and a contact page. 
The program creates six tests, simulating a user navigating from:

    Home to About
    Home to Contact 

    About to Home
    About to Contact

    Contact to Home
    Contact to About


The program uses nested for loops to iterate through a circular array of the button .JSON objects.
To increase efficiency, it does not backtrack. It takes successively larger steps from element
to element. 

The sequence of tests looks like this:

    Array:
        | Home | About | Contact |

    Navigation:
        First loop: step size = 1
            Home to About
            About to Contact
            Contact to Home

        Second loop: step size = 2
            Home to Contact
            Contact to About
            About to Home
        

Navigation tests start from the destination page of the button in the [0] index 
in the array. (Home, in the above example).

If any test fails, the program will automatically navigate to the expected URL in
order to set up the correct preconditions for the next test.
*/

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
        // Navigate to the destination page of the first button in the array.
        await page.navigate(navButtons[0].destURL);
      // maximize?
    });

    afterAll(async () => {
        page.driver.quit();
    });
    // The algorithm this program uses to click through all buttons without backtracking works
    // when there are an odd number of buttons to be clicked (the algorithm will work for an 
    // even-numbered array of size 2). To get around this, if an even number of buttons are 
    // imported from the .JSON file, a dummy button will be pushed onto the array.

    let dummyButton = {
        "buttonXPath": "",
        "destURL": "",
        "buttonName": "",
        "destPage": ""
    }
    
    let flag = false // A flag that the array is even- or odd-numbered, to be used later.
    let length = navButtons.length;  // The number of buttons to be tested

    // If the length of the array is greater than 2 and teh number of buttons it contains is even,
    // push the dummy button onto the array, set the even/odd flag to true, and re-assign the 
    // length variable.
    if ( (length > 2 ) && ( length % 2 == 0 ) ) {
        flag = true;
        navButtons.push(dummyButton);
        length = navButtons.length; 
    }

    // The following two strings will be used to loop around the array:
    // The array index of the button we will click. Start at 0.
    let index = 0;  
    // The array index of the button whose destination page we navigate from. Start at 0.    
    let prev = 0;     

    // The following two strings will be used to compare the expected results and actual results of
    // a navigation button:
    let curURL;     // The URL of the page we have navigated to   
    let goalURL: string = "";   // The URL that clicking of the page we should have navigated to

    let navButtonBy: By;      // A By to locate the button to be tested 
    // A string that will describe the test base being executed. This will be populated with 
    // information from button objects.

    let caseString: string = "";   
    

    // We will loop around the array, clicking buttons and comparing expected results against actual results. 
    // We will take multiple passes around the array, taking successively larger steps in order to 
    // click every button from every other button's destination page. 
    // The "step size" is i.
    for(let i = 1; i <= length - 1; i++) {
        for(let j = 0; j <= length - 1; j++) {

            // We will navigate from the destination page of the button that was just clicked. 
            prev = index;
            // Update the index to find the button that will be clicked next.
            index += i;

            // If the number of buttons to be tested is even, and either the prev or index variables 
            // are currently on that dummy variable, do not carry out a test. Continue to the 
            // next iteration.
            if( ( flag ) &&  (( index % length == length - 1 ) ||
                    ( prev % length == length - 1 ))) { continue }

            // Otherwise, continue on with the test.

            // Create the By element using the xPath of the button-to-be-clicked.
            navButtonBy = By.xpath(navButtons[index % length].buttonXPath);

            // Populate the string describing the test about to be executed. 
            /* For example, if we are testing navigation from the home to about page using the
               about button, the case description will be:

                "Click: 'About' button on 'Home' Page.
                         Leads to: 'About' Page."
            */
            caseString = `Click: '${navButtons[index % length].buttonName}' button on 
                                '${navButtons[prev % length].destPage}' Page. 
                                Leads to: '${navButtons[index % length].destPage}' Page.`;

            // Run the test.
            test(caseString, async () => {

                // Get the button to be clicked, click it, and wait.
                await page.getElement(navButtonBy);
                await page.click(navButtonBy);
                await page.sleep(3000);

                // Update strings to compare actual vs. expected results
                // set curURL to the URL we have actually navigated to
                curURL = await page.driver.getCurrentUrl();
                // set goalURL to the destination URL of the button we just pushed (where we expected
                // to navigate)
                goalURL = navButtons[index % length].destURL;

                // Compare actual vs. expected URLs.
                expect(curURL).toBe(goalURL);
            });

            // If clicking the button did NOT result in navigating the to correct page, navigate to 
            // the correct page. 
            // This means that the next test can run correctly even if the previous test failed.
            if(curURL != goalURL) {
                // navigate to the current button's destination URL.
                page.navigate(navButtons[index % length].destURL);
            }
        }
    }
});