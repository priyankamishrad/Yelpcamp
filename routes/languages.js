const express       = require('express'),
      router        = express.Router(),
      Language      = require('../models/languages');

//Languages page
//==================================
//LANGUAGES ROUTES
//==================================

router.get('/',function(req,res){
    //get languages from the database
    Language.find({},function(err,allLangs){
      if(err) {
        console.log(err);
      } else {
        console.log(allLangs);
        res.render('languages/index',{languages:allLangs, currentUser: req.user });
      }
    });  
  });
  
  //New language page 
  router.get("/new", isLoggedIn, function(req,res){
    res.render('languages/new');
  });
  
  //Post data from form
  router.post("/new", function(req,res){
      let addLang = (req.body.newlang);
      let img = (req.body.newimg);
      let author = { 
          id: req.user._id, 
          user: req.user.username
      };
      let desc = (req.body.newdesc);
    
      let newLang = {
        name : addLang,
        image : img,
        author : author,
        desc : desc
      };
         
  
      Language.create(newLang,function(err,added){
        if(err) {
          console.log(err);
        } else {
          console.log("*******" + added + "*******");
        }
      });
      res.redirect('/languages');
      
  });
  
  //display sngle language page
  router.get("/:id",isLoggedIn, function(req,res){
    let paramsId = req.params.id;
    Language.findById(paramsId).populate('comments').exec(function(err,foundLang){
        if(err) {
          console.log(err);
        } else {
          console.log(foundLang);
          res.render('languages/show', {foundLang : foundLang});
        }
    });
  });


//EDIT LANGUAGE ROUTE
router.get("/:id/edit", function(req,res){
  Language.findById(req.params.id, function(err, foundLanguage){
    if(err) {
      res.redirect("/languages");
    } else{
      res.render('languages/edit', {language: foundLanguage});
    }
  })
  
});

// UPDATE LANGUAGE ROUTE

router.put("/:id", function(req,res){
  //find and update teh correct language
  let addLang = (req.body.newlang);
  let img = (req.body.newimg);
  let author = { 
      id: req.user._id, 
      user: req.user.username
  };
  let desc = (req.body.newdesc);
    
  let newLang = {
    name : addLang,
    image : img,
    author : author,
    desc : desc
  };
  //redirect to the show page

  res.redirect("/languages/:id");
});


  //Middleware

  function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
   }
  module.exports = router;
  