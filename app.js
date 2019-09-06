//eshint jsversion 6

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine','ejs');

const languages = [
      {name : "Javascript", image: "https://img.icons8.com/nolan/2x/js.png"},
      {name : "Python", image: "https://img.icons8.com/color/2x/python.png"},
      {name : "Swift", image: "https://img.icons8.com/nolan/2x/swift-payment-system.png" }

];

app.get('/',function(req,res){
  res.render('landing');
});

app.get('/languages',function(req,res){
  res.render('languages',{languages:languages});
})

app.listen(3000,function(){
  console.log("Server has started!");
});