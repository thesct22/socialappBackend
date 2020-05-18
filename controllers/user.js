const _ =require("lodash");
const User=require('../models/user');
const formidable=require('formidable');
const fs=require('fs');
const user = require("../models/user");

exports.userById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(400).json({error:"User not found!"});
        }
        //adds profile object in req user info
        req.profile=user;
        next();
    });
};

exports.hasAuthorization=(req,res,next)=>{
    const authorized=req.profile&&req.auth&&req.profile._id===req.auth._id;
    if(!authorized){
        return res.status(403).json({
            error:"User not Authorized to do this action!"
        });
    }
};

exports.allUSers=(req,res)=>{
    User.find((err,users)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        res.json(users);
    }).select("name email updated created");
};

exports.getUser=(req,res)=>{
    req.profile.hashed_password=undefined;
    req.profile.salt=undefined;
    return res.json(req.profile);
};

// exports.updateUser=(req,res,next)=>{
//     let user=req.profile;
//     user=_.extend(user, req.body);//extend - mutate the source object
//     user.updated=Date.now();
//     user.save((err)=>{
//         if(err){
//             return res.status(400).json({
//                 error:"You are not authorized to do this action!"
//             });
//         }
//         user.hashed_password=undefined;
//         user.salt=undefined;
//         res.json({user});
//     });
// };

exports.updateUser=(req,res,next)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err, fields,files)=>{
        if(err){
            return res.status.status(400).json({
                error:"Photo could not be uploaded"
            });
        }
    
        let user =req.profile;
        user=_.extend(user,fields);
        user.updated=Date.now();
        
        if(files.photo){
            user.photo.data=fs.readFileSync(files.photo.path);
            user.photo.contentType=files.photo.type;
        }
        
        user.save((err,result)=>{
            if(err){
                console.log(err);
                return res.status(400).json({
                    error:"blah blah blah"
                });
            }
            user.hashed_password=undefined;
            user.salt=undefined;
            res.json(user);
        });
    });
};

exports.userPhoto =(req,res,next)=>{
    if(req.profile.photo.data){
        res.set(("Content-Type", req.profile.photo.contentType));
        return res.send(req.profile.photo.data);
    }
    next();
};

exports.deleteUser=(req,res,next)=>{
    let user=req.profile;
    user.remove((err,user)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        user.hashed_password=undefined;
        user.salt=undefined;
        res.json({user});
    });
};