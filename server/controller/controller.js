require("dotenv").config();
const user = require("../../database/model/userdata");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//home

exports.home = (req, res) => {
    jwt.verify(req.session.token, process.env.secret, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            res.render("home.pug", { title: "HOME" ,Name : req.session.user.UserName});
        }
      });
    
};

//log

exports.log = (req, res) => {
    // console.log(req.session.token)
    if(req.session.token == null)
    {
        res.render("log.pug", { title: "Log-In" });
    }
    else{
        res.send(`<center>you are already loged-in !!!<br>
        <a href="/home/${req.session.user.UserName}"> 
            click here
        </a>
        </center>
        `)
    }
};

//logpost

exports.logPOST = (req,res) => {

    if(!req.body.email || !req.body.password)
    res.render("log.pug", { title: "Log-In" ,err : "Please fill all feilds !!!"});

    else{
        let emailSTR = req.body.email;
        emailSTR = emailSTR.toLowerCase();
    user.findOne({Email : emailSTR}).then((data,err)=>{
        if (err) console.log(err);

        else if (data == null)
        {
            res.render("log.pug", { title: "Log-In" ,err : "Incorrect Credentials !!!"});
        }

        else{


        if (!bcrypt.compareSync(req.body.password, data.Password))
        {
            
            res.render("log.pug", { title: "Log-In" ,err : "Incorrect Credentials !!!"});
        }
        else{
            //genrating a token
            jwt.sign({data},process.env.secret,{expiresIn:'30m'},(err,token)=>{
                if (err) console.log(err);
                req.session.user = data;
                req.session.token = token;
                req.session.save();
                res.redirect('/home/'+data.UserName);
            })
        }
        
    }  
    })
    }
    
};



//sign

exports.sign = (req, res) => {
    res.render("sign.pug", { title: "Sign-Up" });
};

// signpost

exports.signPOST = (req, res) => {
    
    if(req.body.password != req.body.repassword)
    {
        console.log("1")
        // console.log("1")
        res.render("sign.pug", { title: "Sign-Up", err: "Password doesn't match !!!" });
    }
    else if(user.findOne({Email : req.body.email}).then((data)=>{
        if (data != null)
            return true;
        else return false;
    }) == true ){
        res.render("sign.pug", { title: "Sign-Up", err: "This email is already in uesd !!!" });
    }
    else{
        
        if (
            !req.body.username ||
            !req.body.email ||
            !req.body.address ||
            !req.body.password ||
            !req.body.repassword
            ) {
                console.log("2")
                res.render("sign.pug", { title: "Sign-Up", err: true });
                
            } 
            
            else {
                // console.log("3")
            //incrypting the password
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
            else {
                
                let email = req.body.email;
                enail = email.toLowerCase();
                
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    //builting schema data to the database
                    let data = user({
                        UserName: req.body.username,
                        Email: email,
                        Address: req.body.address,
                        Password:hash,
                    });
                    //saveing data
                    data
        .save()
        .then((data, err) => {
            console.log(data);
            if (data != null) {
                res.render("log.pug", { title: "Log-In" });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    });
        }
    });

             }
}
};


//logout

exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect('/log');
}