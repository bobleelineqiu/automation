const path = require("path");
const { promisify } = require("util");
const http = require("http");
const https = require("https");
const fs = require("fs");
const config = require('./../config/default');

const target = config.outputPath
if (!fs.existsSync(target)) {
  fs.mkdirSync(target);
}

// url => image
const url2Img = promisify((url, dir, callback) => {
  const mod = /^https:/.test(url) ? https : http;
  const ext = path.extname(url);
  const file = path.join(dir, `${Date.now()}${ext}`);

  mod.get(url, res => {
    res.pipe(fs.createWriteStream(file)).on("finish", () => {
      callback();
      console.log(file);
    });
  });
});

// base64 => image
const base642Img = async function(base64Str, dir) {
  // data:image/jpeg;base64,/asdasda

  const matches = base64Str.match(/^data:(.+?);base64,(.+)$/);
  try {
    const ext = matches[1].split("/")[1].replace("jpeg", "jpg");
    const file = path.join(dir, `${Date.now()}.${ext}`);

    await fs.writeFile(file, matches[2], "base64", err => {
      err ? console.log("write file error: ", err) : null;
    });
    console.log(file);
  } catch (ex) {
    console.log("非法 base64 字符串");
    console.log(ex);
  }
};

exports.convert2Img = async (src, dir) => {
  if (/^http/.test(src)) {
    await url2Img(src, dir);
  } else {
    console.log("======src======:", src.slice(0, 50));
    await base642Img(src, dir);
  }
};

exports.autoScroll = async page => {
  console.log("scrolling this page to the footer...");
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 100;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
};