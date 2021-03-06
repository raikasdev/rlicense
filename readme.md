![NPM](https://david-dm.org/RaikasCoding/rlicense.svg)\
![NPM](https://img.shields.io/static/v1?label=Contact%20me%20on%20Discord&color=red&style=for-the-badge&logo=discord&message=Raikas%230178)\
[![NPM](https://nodei.co/npm/rlicense.png)](https://nodei.co/npm/rlicense/)

# rLicense

Easy to use licensing system with encryption to keep your data secret

## Using built-in Rest API (Express)

```
var rLicense = require("rlicense");

var system = rLicense("SecretTokenHere");
system.listen(process.env.PORT)
```
#### Requests:

To create a license, send a **POST** request to url/api/new/\
Body Example: `{"product":"example"}`\
Response Example: `{"token":"token","product":"product"}`\
Required Bearer Token. The token is the "SecretTokenHere"\

To revoke a license, send a **POST** request to url/api/revoke\
Body Example: `{"token":"token"}`\
Response Example: `{"success":true}`\
Required Bearer Token. The token is the "SecretTokenHere"\

To verify a license, send a **POST** request to url/api/validate\
Body Example: `{"token":"token","product":"product"}`\
Response Example: `{"valid":true}`\

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
