require('dotenv').config();

const express = require('express');
const route = express.Router();
const controller = require('./controller/controller')
const bodyparser = require('body-parser');
const cookie = require('cookie-parser');
const session = require('express-session')
const jwt = require('jsonwebtoken');

// let time = new Date();
//middleware

function check (req,res,next){
    // console.log(req.session.token)
    if(req.session.user != null && req.session.token != null)
    {
        // console.log(req.session)
        next();
    }
    else
        res.sendStatus(403);

}

function preventBack (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  };

// Verify Token

function authenticateToken(req, res, next) {
    // console.log(req.session.token)
    const token = req.session.token
    if (token == null) return res.send("SORRY")
  
    jwt.verify(token, process.env.secret, (err, user) => {
      // console.log( "user :: ", user)
      
      if (err != null) return res.sendStatus(403);
      
      next();
    })
  }

route.use(cookie());

route.use(session({
    resave : true,
    saveUninitialized : true,
    secret : process.env.secret,
    cookie :{
        maxAge : 300000 //5 minutes
    }

}))

route.use(bodyparser.urlencoded());

//get

route.get('/' , controller.log );

route.get('/home/:Name' ,check,authenticateToken, controller.home );

route.get('/log' ,controller.log );

route.get('/sign' , controller.sign );

route.get('/logout' ,preventBack, controller.logout );

//post 

route.post('/signPost' , controller.signPOST );

route.post('/logPost' , controller.logPOST );

module.exports = route;