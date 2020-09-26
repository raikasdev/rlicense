# rLicense

Easy to use licensing system with encryption to keep your data secret

```
var rLicense = require("rlicense");

var system = rLicense("SecretTokenHere");
system.listen(process.env.PORT)
```

To create new api tokens, send a **POST** request to url/api/new/SecretTokenHere/ProductNameHere
To verify send a **GET** request to url/validate/ProductNameHere/TokenHere

Simple as that, you got a system running.