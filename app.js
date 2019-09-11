//eshint jsversion 6

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/langdb',{useNewUrlParser: true,useUnifiedTopology: true });
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));

//schema set up
const langSchema = new mongoose.Schema({
    name: String,
    image: String,
    author: String,
    desc : String
});

//set up model
const Language = mongoose.model("Language",langSchema);


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
      res.render('index',{languages:allLangs});
    }
  });

  
});

//New form page 
app.get("/languages/new", function(req,res){
  res.render('new');
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
    res.redirect('/languages');
    
});

//display specific language page
app.get("/languages/:id",function(req,res){
  //capture the id
  //let paramsId = req.params.id;
  Language.findById(req.params.id,function(err,foundLang){
      if(err) {
        console.log(err);
      } else {
        res.render('show', {foundLang: foundLang});

      }
  });

//console.log(paramsId);
});

app.listen(3000,function(){
  console.log("Server has started!");
});
