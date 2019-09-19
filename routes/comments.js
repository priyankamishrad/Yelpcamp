const express = require('express');
const router = express.Router({mergeParams:true});
const Language      = require('../models/languages'),
      Comment       = require('../models/comment');


//==================================
//COMMENTS ROUTES
//==================================

//display the route for creating new forms related to the specifc lang.
router.get("/new",isLoggedIn,function(req,res){

    //find language by Id
    Language.findById(req.params.id, function(err,found) {
      if(err) {
        console.log(err);
      } else {
        res.render("comments/new",{language: found});
      }
    });
  });
  
  router.post("/",isLoggedIn,function(req,res){
    //look up language using id
    const id = req.params.id;
    Language.findById(id,function(err,corrLang){
      if(err){
        console.log(err);
        res.redirect("/languages");
      } else {
        Comment.create(req.body.comment,function(err,newCom){
          if(err) {
            console.log(err);
          } else {
            corrLang.comments.push(newCom);
            corrLang.save();
            res.redirect("/languages/" + id);
          }
        });
      }
    });
  });

   function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
   }

  module.exports = router;