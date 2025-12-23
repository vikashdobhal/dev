import puppeteer from "puppeteer";
import axeCore from "axe-core";

export async function scanUrl(url) {
    const browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: "new"
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    await page.addScriptTag({ content: axeCore.source });
    const results = await page.evaluate(async () => {
        return await axe.run({
            runOnly: {
                type: "tag",
                values: ["wcag2a", "wcag2aa"]
            }
        });
    });

    await browser.close();
    return results;
}
