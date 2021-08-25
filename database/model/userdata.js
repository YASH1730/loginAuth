const mongoose = require('mongoose');

const user = mongoose.Schema({
    UserName : String,
    Email : String,
    Address : String,
    Password : String,

})


module.exports =  mongoose.model( 'udetails' , user);