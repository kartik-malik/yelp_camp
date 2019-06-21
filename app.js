var  express       =require("express");
     app           =express(),
     flash         =require("connect-flash-plus");
     bodyParser    =require("body-parser"),
     mongoose      =require("mongoose"),
     Campground   =require("./models/campground");
     
     Comment   =require("./models/comment"),
     User      =require("./models/user"),
     passport  =require("passport"),
     LocalStrategy=require("passport-local"),
     methodOverride=require("method-override");
var  campgroundRoutes=require("./routes/campgrounds"),
     commentRoutes  =require("./routes/comments"),
     indexRoutes      =require("./routes/index");
    //seedDB();

//passport configuration
app.use(flash());
app.use(require("express-session")({
    secret:"secured",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use("/static",express.static("public"));
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});
app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use(methodOverride("_method"));


//mongoose.connect("mongodb://localhost:27017/yelpcamp",{useNewUrlParser: true});
mongoose.connect("mongodb+srv://kartik:kartik@yelpcamp-qgn9t.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true});





//////////
app.listen(process.env.PORT,process.env.IP,function(){


})