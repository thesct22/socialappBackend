const express=require('express');
const {signup,signin,signout}= require("../controllers/auth");
const {userSignupValidator}=require('../validator');
const {userById}= require("../controllers/user");


const router = express.Router();

router.post('/signup',userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

//any routes contaning userId our app will firs execute userId
router.param("userId", userById);

module.exports=router;