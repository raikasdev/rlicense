# rLicense

Easy to use licensing system with encryption to keep your data secret

## Using built-in Rest API (Express)

```
var rLicense = require("rlicense");

var system = rLicense("SecretTokenHere");
system.listen(process.env.PORT)
```

To create new api license, send a **POST** request to url/api/new/SecretTokenHere/ProductNameHere
To revoke a license, send a **POST** request to url/api/revoke/SecretTokenHere/TokenHere
To verify send a **GET** request to url/validate/ProductNameHere/TokenHere

## Using the Node API

```
var rLicense = require("rlicense");
var system = rLicense("SecretTokenHere");

// Validate token by product (If "product" is not provided, it will be using "default" product)
var token = "tokenHere"
console.log("Is token valid: " + system.validate(token, product));

// Create a new token for product (If "product" is not provided, it will be using "default" product)
var tokenData = system.createToken("productName");
var newToken = tokenData.token;
console.log("Data: " + tokenData)
console.log("Token: " + newToken);

// To revoke tokens
var successRevoke = sytem.revoke(newToken);
console.log("Tried revoking token \""+newToken+"\", success: " + successRevoke)
```


Simple as that, you got a system running.
