var express = require('express')
    app = express(),
    bodyParser=require('body-parser');
    mongoose=require('mongoose'),
    methodOverride=require('method-override'),
    moment=require('moment');

mongoose.set('useFindAndModify',false);
mongoose.connect('mongodb://localhost:27017/SmartSearch',{useNewUrlParser:true, useUnifiedTopology:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
// var indexRoutes = require("./routes/index")
// app.use(indexRoutes);
var playlistSchema=new mongoose.Schema({
    name:String,
    date:Date,
    image:String,
    description:String
});
app.locals.moment = require('moment');
moment().format();
var Playlist=mongoose.model("Playlist",playlistSchema);

app.get('/',function(req,res){
    res.render('landing');
})

app.get('/home',function(req,res){
    Playlist.find({},function(err,allplaylists){
        if(err){
            console.log(err);
        }
        else{
            res.render("videos/playlist",{playlist: allplaylists});
        }
    })
})
app.get('/home/new',function(req,res){
    res.render('videos/new');
})
app.post('/home',function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var date=req.body.date;
    var desc=req.body.description;
    var newPlaylist={name:name,date:date,image:image,description:desc};
    Playlist.create(newPlaylist,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            console.log(newlyCreated);
            res.redirect("/home");
        }
    })
})

app.listen(3000,function(){
    console.log("Yelp Camp Server Has Started!");
})