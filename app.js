//eshint jsversion 6

const express         = require('express'),
      ejs             = require('ejs'),
      bodyParser      = require('body-parser'),
      mongoose        = require('mongoose'),
      methodOverride  = require('method-override'),
      seedDB          = require('./seeds'),
      passport        = require('passport'),
      LocalStrategy   = require('passport-local'),
      Comment         = require('./models/comment'),
      Language        = require('./models/languages'),
      User            = require('./models/user'),
      app             = express();

//Requiring Routes
const commentRoutes       = require("./routes/comments"),
      languageRoutes    = require("./routes/languages"),
      indexRoutes         = require("./routes/index")


//seedDB(); // seed the database
mongoose.connect('mongodb://localhost/langdb',{useNewUrlParser: true,useUnifiedTopology: true });
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

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


//creating our own middleware so that the local variables are accessed across
//all pages

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRoutes);
app.use("/languages", languageRoutes);
app.use("/languages/:id/comments", commentRoutes);

//==================================
//LISTENING TO THE SERVER
//==================================
app.listen(3000,function(){
  console.log("Server has started!");
});