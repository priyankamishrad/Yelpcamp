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
  router.get("/new", function(req,res){
    res.render('languages/new');
  });
  
  //Post data from form
  router.post("/new", function(req,res){
      let addLang = (req.body.newlang);
      let img = (req.body.newimg);
      let auth = (req.body.newauth);
      let desc = (req.body.newdesc);
    
      let newLang = {
        name : addLang,
        image : img,
        author : auth,
        desc : desc
      };
  
      Language.create(newLang,function(err,added){
        if(err) {
          console.log(err);
        } else {
          console.log("Document inserted");
        }
      });
      res.redirect('languages/languages');
      
  });
  
  //display sngle language page
  router.get("/:id",function(req,res){
    let paramsId = req.params.id;
    Language.findById(paramsId).populate('comments').exec(function(err,foundLang){
        if(err) {
          console.log(err);
        } else {
          res.render('languages/show', {foundLang : foundLang});
        }
    });
  });

  module.exports = router;
  