import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
} from "selenium-webdriver"; 

import {
    AgendaButton,
    PinboardButton,
    MonthlyButton,
    CalPage
} from "./pageObjects/index"



describe("Early stages work", () => {
    const page = new CalPage();
    beforeEach(async () => {
        page.navigate();
    });
    afterAll(async () => {
        page.driver.quit();
    });
    test("", async () => {
        await page.maxWindow();
        await page.sleep(5000);
    });
});