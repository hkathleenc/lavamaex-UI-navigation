# DevMountain Solo Capstone Project: Automated Functional Testing

This repository houses code for automated tests focusing on Lavamaex's navigation UI. 

However, given correct data, these tests could be used to test UI navigation using header and
footer links on most websites.

# Stack

Code is implemented using Node.js, Jest, TypeScript and Selenium.

# Features Tested

UI Navigation: Header and Footer Links

This project sets up tests that verify whether header and footer links navigate to their correct pages. 


# Test Design

The tests accept data from a .JSON file containing information representing UI navigation buttons.

The buttons are represented with the following data:
    1. The button's xPath
    2. The button's destination URL
    3. The button's displayed name ("Home", "Who We Are". etc.)
    4. The name of the destination page (this is usually the same as the button's displayed name, 
           but not always.)

The test files create tests simulating a user navigating:
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

The Jira project outlining this testing effort can be reached at:
https://dmutah.atlassian.net/browse/HCDL-32
