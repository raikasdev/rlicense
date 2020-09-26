const crypto = require('crypto');
const Enmap = require("enmap");
var database = new Enmap({name: "database"});

var cryptKey;
module.exports = function(key) {
  cryptKey = key;
  if(!key || key === "") {
    console.log("Secret key is empty")
    process.exit()
  }
  console.log("rLicense is ready to run.")
  return module;
}
module.listen = function(port) {
  const express = require("express");
  const app = express();
  app.use(express.static("public"));

  app.get("/", (request, response) => {
    response.send(request.hostname+"/validate/productHere/tokenHere")
  });

  app.get("/validate/:product/:token", (req, res) => {
    var product = req.params.product;
    var token = req.params.token;
    if(!token || !product) {
      res.send("Error")
      return;
    }
    var key = crypto.createCipher('aes-128-cbc', cryptKey);
    var crypted = key.update(token, 'utf8', 'hex')
    crypted += key.final('hex');
    if(database.has(crypted)) {
      if(database.get(crypted,"product").toLowerCase() !== product.toLowerCase()) {
        res.json({status:"Not Verified"})
      } else {
        res.json({status:"Verified"})
      }
    } else {
      res.json({status:"Not Verified"})
    }
  })

  app.post("/api/new/:token/:product/", (req, res) => {
    if(!req.params.token || !req.params.product) {
      res.send("Error")
      return;
    }
    if(req.params.token !== cryptKey) {
      res.send("Error")
      return;
    }
    var id = makeid(15)

    var key = crypto.createCipher('aes-128-cbc', cryptKey);
    var crypted = key.update(id, 'utf8', 'hex')
    crypted += key.final('hex');

    console.log(crypted);
    database.set(crypted,{token:id,product:req.params.product})
    res.json({token:id,product:req.params.product})
  })

  const listener = app.listen(port, () => {
    console.log("rLicense is now listening on port " + listener.address().port);
  });
}

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

var rlicense = require("./index.js")(process.env.KEY);
rlicense.listen(process.env.PORT)