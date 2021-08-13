//user model
const User=require('../models/user');

//register controller
module.exports.RegisterController=function(req, res){
    let {username, password}=req.body;

    User.find({
        username:username
    }, function(err0, result0){
        if(err0) throw err0;
        if(result0){
            if(result0.length==0){
                let new_user=new User({
                    username:username,
                    password:password 
                });
                new_user.save(function(err, result){
                    if (err) throw err;
                    if(result) {
                        res.status(201).json({
                            message:"Correctly registered!"
                        })
                    }
                });                
            }else{
                res.status(409).json({
                    error:"Already existing user!"
                });
            }
        }
    });
}