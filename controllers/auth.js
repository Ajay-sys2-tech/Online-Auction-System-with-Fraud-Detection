const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const express = require("express");
const fileUpload = require('express-fileupload');

const db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


// code for signup page starts here

exports.signup = (req, res) => {
    console.log(req.body);

    // const user = req.body.user;
   

    const {user, name,email, username, password, password2, phone, id } = req.body;

    db.query('SELECT email from user WHERE email = ?', [email],async (error, results) => {
        if(error){
            console.log(error);
        }

        if(results.length > 0){
            return res.render('signup', {
                message: 'That email is already in use'
            })
        }else if( password !== password2){
            return res.render('signup', {
                message: 'Passwords do not match'
            });
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT into user SET ?',{user: user, name: name, email: email, username: username, password: password, phone: phone, id: id }, (error, results) =>{
            if(error){
                console.log(error);
            }else{
                console.log(results);
                return res.render('signup', {
                    message: 'User Registered'
                });
            }

        })
    });
    // res.send("Form submitted");
}

// code for signup page ends here

// code for login page starts here


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if( !username || !password){
            return res.status(400).render('login', {
                message: 'Please provide username and password'
            })
        }

        db.query('SELECT * from user WHERE username = ?',[username], async (error, results) => {
            console.log(results);

             
            // bcrypt.compare( results[0].password )
            if( !results  || !(password == results[0].password )){
                res.status(401).render('login', {
                    message: 'Incorrect username or password'
                })
            }else{
                if( results[0].user == 'seller' ){
                    console.log("inside seller");
                    res.status(200).redirect("/seller");
                }
                else{   
                res.status(200).redirect("/auth/tables");
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}

// code for login page ends here



exports.seller = (req, res) => {
    console.log(req.body);

     // message = '';
     if(req.method == "POST"){
        
        const { name,category, price,  enddate, description } = req.body;
  
       if (!req.files)
                 return res.status(400).send('No files were uploaded.');
  
         var file = req.files.image;
         var img_name=file.name;
  
            if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                  
               file.mv('public/images/upload_images/'+file.name, function(err) {
                              
                   if (err)
  
                     return res.status(500).send(err);

                     db.query('INSERT into items SET ?',{ name: name, category: category, price: price, image: img_name, enddate: enddate, description: description }, (error, results) =>{
                        if(error){
                            console.log(error);
                        }else{
                            console.log(results);
                            return res.render('seller', {
                                message: 'Product Successfully Registered'
                            });
                        }
            
                    })
                 });
           } else {
            
             return res.render('seller',{message: "This format is not allowed , please upload file with '.png','.gif','.jpg'"});
           }
    } else {
    res.render('seller');
    }
    
}

// code for seller page ends here

// code for buyer page starts here




exports.buyer = async(req, res ) => {
   try{
    // var name = req.params.name;
    console.log("Ajay connected items");
    var sql = 'SELECT * FROM items';
    db.query(sql, function(err, data) {
      if (err) throw err;
      else { 
        //   console.log(data);                                   //This block is not working
         res.render('buyer', {
          userData: data
        });
      }
    });
}
catch(e){
    console.log(e);
}
}



exports.tables = (req, res ) => {
    try{
     console.log("Ajay connected items");
     var sql = 'SELECT * FROM items';
     db.query(sql, function(err, results) {
       if (err) throw err;
       else { 
           console.log(results);                                   //This block is not working
          return res.render('tables', {
           userData: results
         });
       }
     });
 }
 catch(e){
     console.log(e);
 }
 }

// code for seller page ends here

exports.addtocart = (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const { pid,email, bid } = req.body;

    db.query('INSERT into bids SET ?',{ pid: pid, email: email, price: bid }, (error, results) =>{
        if(error){
            console.log(error);
        }else{
            console.log(results);
            return res.render('addtocart', {
                // message: 'Product Successfully Registered'
            });
        }

    })
    // res.render('addtocart');   
};


exports.bids = (req, res ) => {
    try{
     console.log("Ajay connected bids");
     var sql = 'SELECT * FROM bids';
     db.query(sql, function(err, results) {
       if (err) throw err;
       else { 
           console.log(results);                                   //This block is not working
          return res.render('bids', {
           userData: results
         });
       }
     });
 }
 catch(e){
     console.log(e);
 }
 }