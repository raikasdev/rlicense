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
module.createToken = function (product) {
  if(!product) product = "default";
  var id = makeid(15)

  var key = crypto.createCipher('aes-128-cbc', cryptKey);
  var crypted = key.update(id, 'utf8', 'hex')
  crypted += key.final('hex');

  database.set(crypted,{token:id,product:req.params.product})
  return {token:id,product:req.params.product};
}

module.validate = function (token, product) {
  if(!token || !product) return false;
  var key = crypto.createCipher('aes-128-cbc', cryptKey);
    var crypted = key.update(token, 'utf8', 'hex')
    crypted += key.final('hex');
    if(database.has(crypted)) {
      if(database.get(crypted,"product").toLowerCase() !== product.toLowerCase()) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
}

module.revoke = function (token) {
  if(!token) return false;
  var key = crypto.createCipher('aes-128-cbc', cryptKey);
  var crypted = key.update(token, 'utf8', 'hex')
  crypted += key.final('hex');
  if(database.has(crypted)) {
    database.delete(crypted);
    return true;
  } else {
    return false;
  }
}

/*
 * Use the integrated Rest API using Express
 */
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
    res.json({valid:module.validate(token,product)})
  })

  app.post("/api/new/:apitoken/:product/", (req, res) => {
    if(!req.params.apitoken || !req.params.product) {
      res.send("Error")
      return;
    }
    if(req.params.apitoken !== cryptKey) {
      res.send("Error")
      return;
    }
    
    res.json(module.createToken(req.params.product))
  })
  app.post("/api/revoke/:apitoken/:token", (req, res) => {
    if(!req.params.apitoken || !req.params.token || !req.params.product) {
      res.send("Error")
      return;
    }
    if(req.params.apitoken !== cryptKey) {
      res.send("Error")
      return;
    }
    
    res.json({success: module.revoke(req.params.token)})
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
