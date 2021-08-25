const colors = require('colors');
const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://PocketChat:yash2424@cluster0.qi4oj.mongodb.net/userlogin?retryWrites=true&w=majority` , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>console.log('> Connected...'.bgCyan))
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red ))