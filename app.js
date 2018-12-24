var fs = require('fs');
var express = require('express')
var app = express()
// GET method route
app.get('/', function (req, res) {
    res.setHeader('Access-Control-ALllow-Origin',"*")

    var json = fs.readFileSync('./qiniukey.json')

    res.write(`
      {
        "uptoken":${json}
      }
      `)
    res.end()
  })

  // POST method route
  app.post('/', function (req, res) {
    res.send('POST request to the homepage')
  })
  app.listen(3000, function () {
    console.log('running...')
  })
