var express = require('express');
var puppeteer = require('puppeteer');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res){
  var playAuth = req.query.playAuth
  var vid = req.query.vid

  let result = {
    code: 0,
    msg: '',
    data: {}
  }

  if(playAuth == undefined || vid == undefined || playAuth == '' || vid == ''){
    result.code = 1
    result.msg = 'params is error.'
    res.json(result)
    return;
  }

  puppeteer.launch({args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ]}).then(async browser => {
    const page = await browser.newPage();
    var playInfo = ''
    page.on('response', response => {
      if(response.url().indexOf('GetPlayInfo') > 0){
        response.text().then(data => {
          playInfo = data
        });
      }
    });

    await page.goto('file://'+process.cwd()+'/aliplayer.html?playAuth=' + encodeURIComponent(playAuth) + '&vid=' + vid, {waitUntil: 'networkidle0'});
    await browser.close();

    if( playInfo != ''){
      result.data = JSON.parse(playInfo)
    }

    res.json(result);
  });
});

module.exports = app;