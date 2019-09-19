const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


  
  //==================================
  //AUTH ROUTES
  //==================================
  //show register form
  router.get("/register",function(req,res){
    res.render('register');
  });
  
  router.post("/register",function(req,res){
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password,function(err,user){
      if(err) {
        console.log(err);
        return res.render('register');
      }
      passport.authenticate("local")(req,res,function(){
        res.redirect("/languages");
      });
    });
  })
  
  //show login form
  router.get("/login",function(req,res){
    res.render('login');
  });
  
  router.post("/login", passport.authenticate("local",
  {
    successRedirect : "/languages",
    failureRedirect: "/login"
  }),function(req,res){
  
  });
  
  //logic route
  router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/languages");
  });
  
  function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
module.exports = router;