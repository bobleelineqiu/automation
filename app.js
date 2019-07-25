const puppeteer = require('puppeteer');
const chalk = require('chalk');
const config = require('./config/default');
const imgFn = require('./utils/img');

class App {
    constructor(conf) {
        this.conf = Object.assign({}, config, conf);
    }

    async start () {
       const browser = await puppeteer.launch();
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
            // await imgFn.autoScroll(page); // 向下滚动加载图片
            console.log(chalk.green(`searching pictures done, start fetch...`));
            const srcs = await page.evaluate(() => {
                const images = document.querySelectorAll("img.main_img");
                return Array.prototype.map.call(images, img => img.src);
              }); // 获取所有img的src
              console.log(`get ${srcs.length} images, start download`);
              for (let i = 0; i < srcs.length; i++) {
                await imgFn.convert2Img(srcs[i], config.outputPath);
                console.log(`finished ${i + 1}/${srcs.length} images`);
              } // 保存图片
              console.log(`job finished!`);
              await browser.close();
        });
    }
};

module.exports = App;