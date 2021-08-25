// importing requirements

const express = require('express');
const app  = express();
const port  = process.env.PORT || 80;

//databse configration

const mongodb = require('./database/db_conficg');

//setting up templete engine
app.set('view-engine','pug');
app.set('views','./view');

//setting the public file
app.use('static',express.static('./public'));
app.use(express.urlencoded());

//route set up
app.use(require("./server/router.js"));


// listening server at port 80

app.listen(port,()=>{
    console.log('http://localhost:80');

})