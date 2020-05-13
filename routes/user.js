const express=require('express');
const {userById, allUSers,getUser,updateUser,deleteUser}= require("../controllers/user");
const {requireSignin}=require("../controllers/auth");

const router = express.Router();

router.get("/users",allUSers);
router.get("/user/:userId",requireSignin,getUser);
router.put("/user/:userId",requireSignin,updateUser);
router.delete("/user/:userId",requireSignin,deleteUser);

//any routes contaning userId our app will firs execute userId
router.param("userId", userById);

module.exports=router;