const puppeteer = require("puppeteer");
const fs = require("fs");
require("dotenv").config();
const { getData } = require("./getData");

const EMAIL = process.env.name;
const PASSWORD = process.env.word;

const scrap = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        // "--disable-gpu",
        // "--disable-dev-shm-usage",
        // "--disable-setuid-sandbox",
        // "--no-sandbox",
        "--user-agent=Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      ],
    });
    const page = await browser.newPage();

    await page.goto("https://instagram.com/");

    await page.setViewport({ width: 1920, height: 1078 });

    // await page.waitForSelector("#loginForm");
    const usernameField = await page.waitForXPath(
      "/html/body/div[2]/div/div/div[2]/div/div/div[1]/section/main/article/div[2]/div[1]/div[2]/form/div/div[1]/div/label/input"
    );
    const passwordField = await page.waitForXPath(
      "/html/body/div[2]/div/div/div[2]/div/div/div[1]/section/main/article/div[2]/div[1]/div[2]/form/div/div[2]/div/label/input"
    );
    await usernameField.type(EMAIL);
    await passwordField.type(PASSWORD);

    await page.click("[type=submit]");

    await page.waitForTimeout(5000);
    const saveButton = await page.waitForXPath(
      "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/section/main/div/div/div/section/div/button"
    );
    saveButton.click();

    // await page.waitForTimeout(5000);
    const turnOnButton = await page.waitForXPath(
      "/html/body/div[3]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div[3]/button[1]"
    );
    turnOnButton.click();
    let firstStory = await page.waitForXPath(
      "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/section/main/div[1]/div/div/div[1]/div/div/div/div/div/div/ul/li[3]/div/button"
    );
    firstStory.click();
    let playButton = await page.waitForXPath(
      "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/section/div[1]/div/div[5]/section/div/header/div[2]/div[2]/div[1]"
    );
    // setInterval(() => {
    // pause
    // playButton.click();
    //   let user = await page.waitForXPath(
    //     "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/section/div[1]/div/div[5]/section/div/header/div[2]/div[1]/div/div[2]/div/div[1]/a"
    //   );
    //   let content = await page.waitForXPath(
    //     "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/section/div[1]/div/div[5]/section/div/div[1]/div/div/img"
    //   );
    // const element = getData(page);
    // console.log({element});
    let elements = [];
    for (let i = 0; i < 10; i++) {
      const data = await page.evaluate(() => {
        let user = document.querySelectorAll("a[role='link'][tabindex='0']")[1]
          .innerHTML;
        let content = document.querySelector("img._aa63._ac51");
        // elements.push({ user, content });
        const nextButton = document.querySelector("._ac0d");
        nextButton.click();
        return { user, content };
      });
      elements.push(data);
      page.waitForTimeout(5000);
    }

    //play
    // playButton.click();
    console.log({ elements });
    // }, 5000);
  } catch (error) {
    console.log({ error });
  }
};

scrap();
