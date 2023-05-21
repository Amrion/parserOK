import puppeteer from "puppeteer";

export const openBrowser = async () => {
    return await puppeteer.launch({headless: 'new'});
}

export const closeBrowser = async (browser) => {
    await browser.close()
}