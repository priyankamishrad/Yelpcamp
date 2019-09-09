//eshint jsversion 6

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();


app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }))
const languages = [
      {name : "Javascript", image: "https://img.icons8.com/nolan/2x/js.png"},
      {name : "Python", image: "https://img.icons8.com/color/2x/python.png"},
      {name : "Swift", image: "https://img.icons8.com/nolan/2x/swift-payment-system.png"},
      {name : "Javascript", image: "https://img.icons8.com/nolan/2x/js.png"},
      {name : "Python", image: "https://img.icons8.com/color/2x/python.png"},
      {name : "Swift", image: "https://img.icons8.com/nolan/2x/swift-payment-system.png"},
      {name : "Javascript", image: "https://img.icons8.com/nolan/2x/js.png"},
      {name : "Python", image: "https://img.icons8.com/color/2x/python.png"},
      {name : "Swift", image: "https://img.icons8.com/nolan/2x/swift-payment-system.png" }
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