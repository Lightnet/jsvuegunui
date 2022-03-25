# SEA.js
- https://gun.eco/docs/User

# Information:
 This just some examples and prototype to build 

```javascript
;(async () => {
	var SEA = Gun.SEA;
	var pair = await SEA.pair();
	var enc = await SEA.encrypt('hello self', pair);
	var data = await SEA.sign(enc, pair);
	console.log(data);
	var msg = await SEA.verify(data, pair);
	var dec = await SEA.decrypt(msg, pair);
	var proof = await SEA.work(dec, pair);
	var check = await SEA.work('hello self', pair);
	console.log(dec);
	console.log(proof === check);
	})();
```

```
user.recall({sessionStorage: true});
user.leave()//to logout
```


# Gun.js Sea.js
 * https://gun.eco/docs/SEA
 * https://gist.github.com/amark/7dceae874a20878fdb9e2a8eed109bb5 PM
 * https://gist.github.com/amark
 * https://gist.github.com/amark/44b8110a3c848917d6c738f9c3a36e24

Links:
 * https://gist.github.com/amark/44b8110a3c848917d6c738f9c3a36e24 grant access
 * https://gist.github.com/amark/755193244d28f4f4c980130055a26e5c change password