var express =require("express");
var router  =express.Router({mergeParams:true});
var Comment   =require("../models/comment");
Campground   =require("../models/campground");
var middleware=require("../middleware/index");
var methodOverride=require("method-override");
var flash         =require("connect-flash");

router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,found){
          if(err){

          }
          else{
        res.render("comments/new",{campground:found})
          }
    })
    
})

router.post("/",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,found){
       if(err){
           console.log(err)
       }
       else{
           
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                  console.log(err)
               }
               comment.author.id=req.user_id;
               comment.author.username=req.user.username;
               comment.save();
               found.comments.push(comment)
               found.save();
               res.redirect("/campgrounds/"+found._id)
           })
       }

    })
});
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment})
        }
    })
    
})

router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
         res.redirect("back")
        }
        else{
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
});
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })


});



function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


function checkCommentOwnership(req,res,next){
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
                    res.redirect("back");
                    
                }
            }
        })  ;
       } else{
           res.redirect("back")
       }




}
module.exports=router