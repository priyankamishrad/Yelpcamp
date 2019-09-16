const mongoose = require('mongoose');
const Language = require("./models/languages");
const Comment = require('./models/comment');

const data = [
   {
    name: 'Visual Basic',
    image: 'https://img.icons8.com/ios-filled/2x/visual-basic.png',
    author: 'Microsoft',
    desc: 'An event-driven language created to develop custom macros in excel.'
   },
   {
    name: 'Java',
    image: 'https://img.icons8.com/ios/2x/java-coffee-cup-logo.png',
    author: 'Sun Microsystems',
    desc: 'A class-based, OOP designed to have few implementation dependencies as possible.',
   },
   {
    name: 'Ruby',
    image: 'https://img.icons8.com/office/2x/ruby-programming-language.png',
    author: 'Yukihiro "Matz" Matsumoto',
    desc: 'A high level interpreted programming language. ' 
   },
   {
    name: 'JavaScript',
    image: 'https://img.icons8.com/color/2x/javascript.png',
    author: 'Netscape, Mozilla foundation, ECMA',
    desc: 'A high-level interpreted scripting language.'
   }
];
function seedDB() {

    //remove all campgrounds
    Language.remove({}, function(err){
        if(err) {
            console.log(err);
        } 
        console.log('Removed all languages');
    });
    // add a few campgrounds
    data.forEach(function(seed){
        Language.create(seed,function(err,data){
            if(err){
                console.log(err)
            } else {
                console.log("Added a language");
                //create a comment
                Comment.create(
                {
                    text : "I love all these languages except VB",
                    author : "Priyanka"
                },function(err,comment){
                    if (err) {
                        console.log(err);
                    } else {
                        data.comments.push(comment);
                        data.save();
                       console.log("Added new comment");

                    }
                }) 
            }
        })
    });
    //add a few comments



}

module.exports = seedDB;