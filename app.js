var fs = require('fs');
var express = require('express')
var app = express()
var qiniu = require('qiniu')
// GET method route

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};

app.use(allowCrossDomain);


app.get('/uptoken', function (req, res) {
    res.setHeader('Access-Control-ALllow-Origin',"*")

    var config = fs.readFileSync('./qiniu-key.json')
    config = JSON.parse(config)



    let {accessKey,secretKey} = config

    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    var options = {
      scope: 'test',
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);


    res.write(`
      {
        "uptoken":"${uploadToken}"
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
