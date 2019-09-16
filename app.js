//eshint jsversion 6

const express = require('express'),
      ejs = require('ejs'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      Language = require('./models/languages'),
      seedDB = require('./seeds'),
      Comment = require('./models/comment'),
      // User = require('./models/users'),
      app = express();

seedDB();
mongoose.connect('mongodb://localhost/langdb',{useNewUrlParser: true,useUnifiedTopology: true });
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//Setting up routes
//Landing page
app.get('/',function(req,res){
  res.render('landing');
});

//Languages page
app.get('/languages',function(req,res){
  //get languages from the database
  Language.find({},function(err,allLangs){
    if(err) {
      console.log(err);
    } else {
      console.log(allLangs);
      res.render('languages/index',{languages:allLangs});
    }
  });

  
});

//New form page 
app.get("/languages/new", function(req,res){
  res.render('languages/new');
});

//Post data from form
app.post("/languages/new", function(req,res){
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


//display specific language page
app.get("/languages/:id",function(req,res){
  //capture the id
  let paramsId = req.params.id;
  //console.log(paramsId);
  Language.findById(paramsId).populate('comments').exec(function(err,foundLang){
      if(err) {
        console.log(err);
      } else {

        res.render('languages/show', {foundLang : foundLang});

      }
  });

//console.log(paramsId);
});


//==================================
//COMMENTS ROUTES
//==================================

//display the route for creating new forms related to the specifc lang.
app.get("/languages/:id/comments/new",function(req,res){

  //find campground by Id
  Language.findById(req.params.id, function(err,found) {
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new",{language: found});
    }
  });
});

app.post("/languages/:id/comments/",function(req,res){
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
  //create new comment
  //connect new comment to language
  //redirect lanuage to show page
  //res.redirect("/languages/:id");
});











//==================================
//LISTENING TO THE SERVER
//==================================
app.listen(3000,function(){
  console.log("Server has started!");
});
