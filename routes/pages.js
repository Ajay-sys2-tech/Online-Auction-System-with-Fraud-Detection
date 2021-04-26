const express = require("express");



const router = express.Router();

router.get('/',(req,res)=>{  
    res.render('index');
});

router.get('/signup',(req,res)=>{
    res.render('signup');
});

router.get('/login',(req,res)=>{
    res.render('login');
});

router.get('/seller',(req,res)=>{
    res.render('seller');
});

router.get('/buyer',(req,res)=>{
    res.render('buyer');
});

router.get('/tables',(req,res)=>{
    res.render('tables');
});

router.get('/addtocart',(req,res)=>{

    res.render('addtocart');
});

router.get('/bids',(req,res)=>{

    res.render('bids');
});





module.exports = router;
