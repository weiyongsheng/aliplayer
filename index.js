var puppeteer = require('puppeteer');
puppeteer.launch({
  args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
  ]
}).then(async browser => {
  const page = await browser.newPage();
  var playInfo = ''
  page.on('response', response => {
    if(response.url().indexOf('GetPlayInfo') > 0){
      response.text().then(data => {
        playInfo = data
      });
    }
  });

  var data = {}
  var playAuth='eyJTZWN1cml0eVRva2VuIjoiQ0FJUzF3SjFxNkZ0NUIyeWZTaklyNWJVSnZMNHRlNTM4NlNTVDFhSjEyWmtkc3AwdWZUanJ6ejJJSGxQZTNGaEFPb2V2L2svbVc5VTdmb2NscnNvRXNRZEZSQ1ZObzVvNnAxR3pRU2lib3laVUJ4aE9FdEMydk9mQW1HMkowUFJMNmF3Q3J5THNicS9GOTZwYjFmYjdDd1JwWkx4YVRTbFdYRzhMSlNOa3VRSlI5OExYdzYrSHdFa1k4bFJLbGxOcGRNaU1YTEFGUENqTlh5UW5HM2NYbVZscGpSOWhXNTR3cU81ek15VGlIemJrRWFvOHVzY3RvbnJDNFc0YjZzSU9ZdGtBZSt4MWYxWGNLVEdza2hWOXdNWTJLcDlscjFjNVJUS3I2dnFZVDlyN2c2Qkx2RGYvL0IyTVFaOWZkSmFJYU5mcStYbW52QUswWTY2MWFhUGtrZ2RiTEFORG42QUh0djRtSldhUTluRWJJaHBLZXpKWEYzV3ljMktPNVhQdEFjcFhHa1dMZ3NpZWFCNmN5UXZVVTExRUdtTGQvLzZwd3lSUGxtNU40R0IwYkFyMTZSeXcyN2g5TUd4TzBPMVJMR1V3Ym00aEN5UG1hdERHb0FCcFhITXRVeE1tR0wzdFFJZTJiOG9YRHJPTDc5N0RseEtnR01HUUwrMEVJOTVjTHlMVVdrOVJTbW1qV3NOUnBEYW5aemRmREZuUGNiN1NlMnZ6NVAxOEVBLzlYZ0JCNjhYUWVRNkIvTWpydWdWWDVRM2cyRlBBZExoZHhwa3pCNHhOWm9iTTgyRFRGS29oQTdPUFZUZjAvaFN1Q2prclFSWlFGbFg3eE1lQ040PSIsIkF1dGhJbmZvIjoie1wiQ0lcIjpcInJmcGpKTTR6L1ZQSnZ3RmRCR01CVDZJMUY4Nm13T09jN0d1N3Q4dHpERjNleElCNUtJL1ozbnorUmlnbUhGc2VHMkJuczZQUXBvTnBcXHJcXG5EK0loSEIzRHVBPT1cXHJcXG5cIixcIkNhbGxlclwiOlwiekNnZFVGbjVLTUl2MjVnTThoVFRYZz09XFxyXFxuXCIsXCJFeHBpcmVUaW1lXCI6XCIyMDIwLTA1LTA5VDAzOjU0OjI0WlwiLFwiTWVkaWFJZFwiOlwiNWI3MzZiMTA3ODgwNGFkOGFmYTk4OGFhMTNmYzcyNjdcIixcIlBsYXlEb21haW5cIjpcIm1lZGlhMDAxLmdlZWtiYW5nLm9yZ1wiLFwiU2lnbmF0dXJlXCI6XCJvWGE1ditQQkdrSXBLY1ZNY3M0MGIvN3JvRlE9XCJ9IiwiVmlkZW9NZXRhIjp7IlN0YXR1cyI6Ik5vcm1hbCIsIlZpZGVvSWQiOiI1YjczNmIxMDc4ODA0YWQ4YWZhOTg4YWExM2ZjNzI2NyIsIlRpdGxlIjoiMDEgLSDor77nqIvku4vnu40o5pawKSIsIkNvdmVyVVJMIjoiaHR0cHM6Ly9tZWRpYTAwMS5nZWVrYmFuZy5vcmcvNWI3MzZiMTA3ODgwNGFkOGFmYTk4OGFhMTNmYzcyNjcvc25hcHNob3RzLzUwZmQ1Y2Q3NmFmMjQ0YTlhOTgyN2Q4ZTBkNWU0OGJiLTAwMDA1LmpwZyIsIkR1cmF0aW9uIjozMDguNTA2fSwiQWNjZXNzS2V5SWQiOiJTVFMuTlVhbUhMWDFWRGZ5TXA4M2YxekVYVjFITSIsIlBsYXlEb21haW4iOiJtZWRpYTAwMS5nZWVrYmFuZy5vcmciLCJBY2Nlc3NLZXlTZWNyZXQiOiJEaTU3a1lYeEgxQmRIZ25zUThOdEdFc2tIckhkeWl6UnRhU2dOZ1VwQzVXViIsIlJlZ2lvbiI6ImNuLXNoYW5naGFpIiwiQ3VzdG9tZXJJZCI6MzEzMDg0OTN9'
  var vid = '5b736b1078804ad8afa988aa13fc7267'
  await page.goto('file://'+process.cwd()+'/aliplayer.html?playAuth=' + encodeURIComponent(playAuth) + '&vid=' + vid, {waitUntil: 'networkidle0'});
  await browser.close();

  if( playInfo != ''){
    data = JSON.parse(playInfo)
  }

  console.log(data)

});