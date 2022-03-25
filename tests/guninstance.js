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
Gun({ file: 'data.json', web: server });

console.log('Server started on port ' + port + ' with /gun');