const express=require('express');
const {
    userById, 
    allUSers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
    findPeople
    
}= require("../controllers/user");
const {requireSignin}=require("../controllers/auth");

const router = express.Router();

router.put('/user/follow',requireSignin,addFollowing,addFollower);
router.put('/user/unfollow',requireSignin,removeFollowing,removeFollower);

router.get("/users",allUSers);
router.get("/user/:userId",requireSignin,getUser);
router.put("/user/:userId",requireSignin,updateUser);
router.delete("/user/:userId",requireSignin,deleteUser);

//photo
router.get("/user/photo/:userId",userPhoto);

//who to follow
router.get('/user/findpeople/:userId',requireSignin,findPeople);

//any routes contaning userId our app will firs execute userId
router.param("userId", userById);

module.exports=router;