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
    image: String
});

//set up model
const Language = mongoose.model("Language",langSchema);

// Language.create(
//   {name : "Javascript", image: "https://img.icons8.com/nolan/2x/js.png"},
//   {name : "Python", image: "https://img.icons8.com/color/2x/python.png"}, 
//   function(err,lang){
//   if(err) {
//     console.log(err)
//   } else {
//     console.log("Created New Language");
//     console.log(lang);
//   }
// });

Language.deleteone

const languages = [
      {name : "Javascript", image: "https://img.icons8.com/nolan/2x/js.png"},
      {name : "Python", image: "https://img.icons8.com/color/2x/python.png"},
      {name : "Swift", image: "https://img.icons8.com/nolan/2x/swift-payment-system.png"}
];

app.get('/',function(req,res){
  res.render('landing');
});

app.get('/languages',function(req,res){
  res.render('languages',{languages:languages});
});

app.get("/compose", function(req,res){
  res.render('compose');
  //console.log(req.body.addLang);
});

app.post("/compose", function(req,res){
    let addLang = (req.body.addLang);
    let image = (req.body.image);
    let newLang = {addLang, image};
    languages.push(newLang);
    
    res.redirect('/languages');
    
});

app.listen(3000,function(){
  console.log("Server has started!");
});