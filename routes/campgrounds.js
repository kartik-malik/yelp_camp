var express =require("express");
var router  =express.Router();
var methodOverride=require("method-override");
var Campground   =require("../models/campground");
var middleware=require("../middleware/index");
app.use(methodOverride("_method"));

router.get("/",function(req,res){
    
    Campground.find({},function(err,campgrounds){
        if(err)
        {
            console.log("error");
        }
        else{
            res.render("campgrounds/index",{campgrounds:campgrounds,currentUser:req.user});
        }
    });
  
  });
  router.post("/",middleware.isLoggedIn,function(req,res){
      var name=req.body.name;
      var image=req.body.image;
      var description=req.body.description;
      var author={
          id:req.user._id,
          username:req.user.username
      }
      var newCampground={ name: name,image:image,description:description,author:author};
      Campground.create(newCampground,function(err,newlyCreated){
                 if(err){
                     console.log("error");
                 }
                 else{
                  res.redirect("/campgrounds");
                 }
      });
      
  
  
  
  });
  
  router.get("/new",middleware.isLoggedIn,function(req,res){
  
      res.render("campgrounds/new")
  ;});
  
  
  
  router.get("/:id",function(req,res){
      Campground.findById(req.params.id).populate("comments").exec(function(err,found){
           if(err){
               console.log("error");
           }
           else{
               console.log(found)
               res.render("campgrounds/show",{campground:found})
           }
      });
  });


  router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
    res.render("campgrounds/edit",{campground:foundCampground})
    });

  });
  router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
       if(err){
           res.redirect("/campgrounds")
       } else{
           res.redirect("/campgrounds/"+req.params.id)
       }
    });
  });
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
     Campground.findByIdAndRemove(req.params.id,function(err){
         if(err){
             console.log(err);
         }
         else{
             res.redirect("/campgrounds");
         }
     })
});




  function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
function checkCampgroundOwnership(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){

            if(err){
                console.log(err);
            } else{
                if(foundCampground.author.id.equals(req.user._id)){
                next();
                }
                else{
                    res.redirect("back");
                }
            }
        })  ;
       } else{
           res.redirect("back")
       }




}



  module.exports=router