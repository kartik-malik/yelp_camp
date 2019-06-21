var Campground=require("../models/campground")
var Comment=require("../models/comment")
var flash =require("connect-flash-plus")
var middlewareObj={}

middlewareObj.checkCampgroundOwnership=function checkCampgroundOwnership(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){

            if(err){
                req.flash("error","not found");
                res.redirect("back")
            } else{
                if(foundCampground.author.id.equals(req.user._id)){
                next();
                }
                else{
                    req.flash("error","permission denied");
                    res.redirect("back");
                }
            }
        })  ;
       } else{
        req.flash("error","please log in first");
           res.redirect("back")
       }





}

middlewareObj.checkCommentOwnership=function checkCommentOwnership(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){

            if(err){
                console.log(err);
            } else{ console.log(foundComment);
                console.log(req.user.username);
                if(foundComment.author.username==req.user.username){
                next();
                }
                else{
                    req.flash("error","permission denied");
                    res.redirect("back");
                    
                }
            }
        })  ;
       } else{
        req.flash("error","please log in");
           res.redirect("back")
       }
 }

 middlewareObj.isLoggedIn= function isLoggedIn(req,res,next){
   if(req.isAuthenticated()){
       return next();
   }
   req.flash("error","please log in first");
   res.redirect("/login");
}








module.exports=middlewareObj