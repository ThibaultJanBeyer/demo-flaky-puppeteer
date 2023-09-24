let jest_puppeteer_conf = {
  launch: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    timeout: 30000,
    headless: false,
    slowMo: 250,
    devtools: true,
    dumpio: true, // Whether to pipe the browser process stdout and stderr
  },
};

module.exports = jest_puppeteer_conf;
