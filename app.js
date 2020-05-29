var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport    = require("passport"),
    flash          = require("connect-flash");
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User        = require("./models/user"),
    seedDB          = require("./seeds");

// routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Database configuration
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seed the database
// seedDB(); 
// inorder to user current user in header.ejs
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function () {
    console.log("The YelpCamp Server has started!");
});

//connect mongodb with 
//brew services start mongodb-community@4.2
//disconnect with 
//brew services stop mongodb-community@4.2


