var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// go to the campground
router.get("/", function (req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
           res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user});
        }
     });
    // res.render("campgrounds", { campgrounds: campgrounds });
})
// post new campground
router.post("/", isLoggedIn, function (req, res) {
    // res.send("This is a post route");
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user.id,
        username: req.user.username
    }
    var newCampground = { name: name, image: image, description: desc, author: author};
    // campgrounds.push(newCampground);
    // res.redirect("/campgrounds");
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrou nds page
            res.redirect("/campgrounds");
        }
    });
})
// add new campground 
router.get("/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});
// show new campground info
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})
 //middleware
 function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;