# Gun

# Information:
 Gun.js is peer to peer database. Gun.js has many libs to help develop type app like private message, timegraph like real time update feeds from browser, and others to develop graph database. Note it used history graph to prevent false and compare edit if not own or other peers to match.

 You can think of node graph that used key base id to create a node and link with another key. Gun.js can be run on browser client javascript or with network peer.

Browser client stand alone.
```html
<script src="https://cdn.jsdelivr.net/npm/gun/gun.js"></script>
<script>
    var gun = Gun();//not connect to peeer but stand alone
    gun.get('mark').put({
        name: "Mark",
        email: "mark@gunDB.io",
    });

    gun.get('mark').on(function(data, key){
        console.log("update:", data);
    });
</script>
```


Simple Server.js
```javascript
var port    = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8080;
var express = require('express');
var Gun     = require('gun');

var app    = express();
app.use(Gun.serve);
app.use(express.static(__dirname));

var html_index = `
<script src="gun/gun.js"></script>
<script>
    var gun = Gun('http://localhost:8080/gun');//peer but need to add prefix for to work.
    gun.get('mark').put({
        name: "Mark",
        email: "mark@gunDB.io",
    });

    gun.get('mark').on(function(data, key){
        console.log("update:", data);
    });

</script>
`;
app.get('/', (req, res) =>{
    res.send(html_index);
});

var server = app.listen(port);
Gun({	file: 'data.json', web: server });

console.log('Server started on port ' + port + ' with /gun');
```

Client Browser
```html
<script src="https://cdn.jsdelivr.net/npm/gun/gun.js"></script>
<script>
    var gun = Gun('http://localhost:8080/gun');//peer but need to add prefix for to work.
    gun.get('mark').put({
        name: "Mark",
        email: "mark@gunDB.io",
    });

    gun.get('mark').on(function(data, key){
        console.log("update:", data);
    });
</script>
```

Note there are some vary way to setup gun and config them.

# Gun.js Libs:
 * lib/time.js (subscribe real time feeds base on time push into node)
 * 

Links:
 * https://github.com/amark/gun/wiki/How-to-Sync-Time
 * https://github.com/amark/gun/wiki/Timegraph timegraph
 * http://jsbin.com/vazazelinu/edit?js,console,output timegraph


 ```
//user.get('contact').map().once(data=>{
    //console.log(data);
    //if(data.pub == pub){
        //console.log(data._['#']);
        //gun.get(data._['#']).once(d=>{
            //console.log(d);
        //})
        //gun.get(data._['#']).put('null');
        //console.log("FOUND!");
    //}
//});

 ```

```
subscribe

```

```js
user.get('profile').on((data, key, at, ev)=>{
        //console.log(Gun.node.is(data));//nope
        ev.off(); //pervent loops listen add on?
        console.log(data);
        console.log(key);
        console.log(at);
        console.log(ev);
        let da = toRaw(data);
        console.log(da)
      })
```

```js
user.get('profile').once((data, key, at, ev)=>{//nope
    //console.log(Gun.node.is(data));//nope
    console.log(data);
    console.log(key);
    console.log(at);
    console.log(ev);
    let da = toRaw(data);//object 
    console.log(da)
  })
```