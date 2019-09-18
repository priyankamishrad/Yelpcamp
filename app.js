//eshint jsversion 6

const express     = require('express'),
      ejs         = require('ejs'),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      Language    = require('./models/languages'),
      seedDB      = require('./seeds'),
      Comment     = require('./models/comment'),
      passport    = require('passport'),
      LocalStrategy = require('passport-local'),
      User = require('./models/user'),
      app = express();

seedDB();
mongoose.connect('mongodb://localhost/langdb',{useNewUrlParser: true,useUnifiedTopology: true });
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret : "Neil and Aariya are always the cutest",
  resave : false,
  saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//=========================
//Setting up routes
//=========================

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

//New language page 
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

//display sngle language page
app.get("/languages/:id",function(req,res){
  let paramsId = req.params.id;
  Language.findById(paramsId).populate('comments').exec(function(err,foundLang){
      if(err) {
        console.log(err);
      } else {
        res.render('languages/show', {foundLang : foundLang});
      }
  });
});


//==================================
//COMMENTS ROUTES
//==================================

//display the route for creating new forms related to the specifc lang.
app.get("/languages/:id/comments/new",isLoggedIn,function(req,res){

  //find language by Id
  Language.findById(req.params.id, function(err,found) {
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new",{language: found});
    }
  });
});

app.post("/languages/:id/comments/",isLoggedIn,function(req,res){
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

//==================================
//AUTH ROUTES
//==================================
//show register form
app.get("/register",function(req,res){
  res.render('register');
});

app.post("/register",function(req,res){
  const newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password,function(err,user){
    if(err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req,res,function(){
      res.redirect("/languages");
    });
  });
})

//show login form
app.get("/login",function(req,res){
  res.render('login');
});

app.post("/login", passport.authenticate("local",
{
  successRedirect : "/languages",
  failureRedirect: "/login"
}),function(req,res){

});

//logic route
app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/languages");
});

function isLoggedIn(req,res,next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}



//==================================
//LISTENING TO THE SERVER
//==================================
app.listen(3000,function(){
  console.log("Server has started!");
});
