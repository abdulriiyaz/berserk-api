//import express
const express = require("express");
const router = express.Router();

//import puppeteer
const puppeteer = require("puppeteer");
let character = "";

router.get("/", handleAPIRequest);

async function handleAPIRequest(req, res, next) {
    character = req.body.character;
    const data = await fetchData(character);
    res.json({ character: req.body.character, desc: data[0] });
}

const fetchData = async (c) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(`https://berserk.fandom.com/wiki/${c}`);

    const data = await page.evaluate(() => {
        let contents = [];
        let content = document.querySelectorAll("p");
        for (let i = 0; i < content.length; i++) {
            contents.push(content[i].innerText);
        }
        return contents;
    });
    //console.log(`https://berserk.fandom.com/wiki/${c}`);
    //filter the array where the first element is the 'c'
    //await page.screenshot({ path: "example.png" });
    await browser.close();
    return data.filter((e) => e.includes("is a"));
};

module.exports = router;
