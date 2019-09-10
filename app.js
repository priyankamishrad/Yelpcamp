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
    description: String
});

//set up model
const Language = mongoose.model("Language",langSchema);


app.get('/',function(req,res){
  res.render('landing');
});

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

app.get("/languages/new", function(req,res){
  res.render('new');
});

app.post("/languages/new", function(req,res){
    let addLang = (req.body.newlang);
    let img = (req.body.newimg);
    let desc = (req.body.newdesc);
    let newLang = {
      name : addLang,
      image : img,
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

app.get("/languages/:id",function(req,res){
  res.render('show');
});

app.listen(3000,function(){
  console.log("Server has started!");
});