const puppeteer = require('puppeteer');
const chalk = require('chalk');
const fs = require('fs');
const config = require('./config/jenkins');
const cheerio = require('cheerio')

class Jenkins{
    constructor(conf = {}){
        this.conf = Object.assign({},config,conf)
    }
    async start(){
        const browser = await puppeteer.launch({
            headless: false,
            slowMo:100
        })
        const page = await browser.newPage();
        await page.goto(this.conf.searchPath)
        await page.setViewport({
            width: 1920,
            height: 800
        });
        await page.type('#j_username',this.conf.userName);
        await page.type('input[name="j_password"]',this.conf.password);
        await page.click('input[name="Submit"]');
        await page.waitForSelector('a[href="/view/%E5%89%8D%E7%AB%AF/"]')
        await page.click('a[href="/view/%E5%89%8D%E7%AB%AF/"]');
        await page.click('a[href="job/res_dev/"]')
        await page.waitForSelector('a[href="/view/%E5%89%8D%E7%AB%AF/job/res_dev/build?delay=0sec"]')
        await page.click('a[href="/view/%E5%89%8D%E7%AB%AF/job/res_dev/build?delay=0sec"]')
        await page.click('#yui-gen4-button')
    }
}
module.exports = Jenkins;