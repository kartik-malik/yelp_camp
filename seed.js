var mongoose=require("mongoose");
    Campground=require("./models/campground");
    Comment   =require("./models/comment")
var data=[
    {
        name:"new1",
        image:"http://localhost:3000/static/assets/camp.jpg",
        description:"Enim ad ex deserunt enim. Officia est consequat anim ea tempor excepteur id. Ullamco consequat sint minim sint occaecat sunt reprehenderit consequat ad sint exercitation Lorem do."
    },
    {
        name:"new2",
        image:"http://localhost:3000/static/assets/camp2.jpg",
        description:"Mollit velit reprehenderit velit aliquip eu enim."
    },
    {
        name:"new3",
        image:"http://localhost:3000/static/assets/camp3.jpg",

        description:"In elit elit ut officia in excepteur excepteur ut cupidatat aliquip minim. Adipisicing qui aliquip ut mollit nulla do enim est sunt incididunt do excepteur reprehenderit est. Ea est magna aliqua ex qui cupidatat aliquip. Quis eiusmod proident fugiat anim dolor excepteur elit. Dolor sunt sunt eu laboris velit sunt laboris ullamco cupidatat irure aliquip aliquip aute in."
    }
]

function seedDB(){
                   
    Campground.remove({},function(err){
    if(err){
        console.log(err);
    }            
    data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
            if(err){
                console.log(err)
            }
            else{
                Comment.create(
                    {
                        text:"greatplace",
                        author:"none"
                    }
                ,function(err,comment){
                    if(err){
                        console.log(err)
                    }
                    else{
                    campground.comments.push(comment)
                    campground.save();
                }
                })
            }
        })

    })




 
        })
        













    }
    module.exports=seedDB;
