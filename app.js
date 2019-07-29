const puppeteer = require('puppeteer');
const chalk = require('chalk');
const config = require('./config/default');
const imgFn = require('./utils/img');
const fs = require('fs');

class App {
    constructor(conf) {
        this.conf = Object.assign({}, config, conf);
    }

    async start () {
        const target = config.outputPath
            if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
            }
        const browser = await puppeteer.launch({
            headless: true, //默认为true（无头），不显示浏览器界面
            slowMo :200, //减速显示，有时会作为模拟人操作特意减速
            devtools: true //显示开发者工具。页面宽高默认800*600,把开发者工具显示再隐藏页面会占满屏幕，有没有大佬解释下？
          });
        
        const page = await browser.newPage();
    
        //打开搜索引擎，先写死百度
        await page.goto(this.conf.searchPath);
        console.log(chalk.green(`go to ${this.conf.searchPath}`));
    
        //设置窗口大小，过大会引起反爬虫
        // await page.setViewport({
        //     width: 1920,
        //     height: 700
        // });
    
        //搜索文字输入框聚焦
        await page.focus('#kw');
    
        //输入要搜索的关键字
        await page.keyboard.sendCharacter(this.conf.keyword);
        //点击搜索
        await page.click('.s_search');
        console.log(chalk.green(`get start searching pictures`));
        //页面加载后要做的事
        page.on('load', async () => {
            await imgFn.autoScroll(page); // 向下滚动加载图片
            console.log(chalk.green(`searching pictures done, start fetch...`));
            
            const srcs = await page.evaluate(() => {
                const images = document.querySelectorAll("img.main_img");
                return Array.prototype.map.call(images, img => img.src);
              }); // 获取所有img的src
              console.log(`get ${srcs.length} images, start download`);
              
              for (let i = 0; i < srcs.length; i++) {
                imgFn.convert2Img(srcs[i], config.outputPath);
                console.log(`finished ${i + 1}/${srcs.length} images`);
              }
              console.log(`job finished!`);
              await browser.close();
        });
        //获取所有图片
        // let counter = 0;
        // page.on('response', async (response) => {
        //     const matches = /.*\.(jpg|png)$/.exec(response.url());
        //     if (matches && (matches.length === 2)) {
        //     const extension = matches[1];
        //     const buffer = await response.buffer();
        //     fs.writeFileSync(`images/image-${counter}.${extension}`, buffer, 'base64');
        //     counter += 1;
        //     }
        // });
    }
};

module.exports = App;