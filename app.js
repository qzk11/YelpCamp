var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
var campgrounds = [
        // {name: "name1", image:"https://media.istockphoto.com/photos/beautiful-woman-with-natural-makeup-picture-id897056188"},
        // {name: "name1", image:"https://media.istockphoto.com/photos/beautiful-african-american-female-model-picture-id910856488"},
        // {name: "name1", image:"https://media.istockphoto.com/photos/young-gorgeous-asian-woman-in-a-smoky-eyes-style-make-up-dressed-in-a-picture-id865326900"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
    ];
app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/campgrounds", function(req,res) {
    
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req,res) {
    // res.send("This is a post route");
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");

})

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started!");
});