const express=require('express');
const {getPosts, createPost,postsByUser}= require("../controllers/post");
const {createPostValidator}=require('../validator');
const {userById}=require("../controllers/user");
const {requireSignin}=require("../controllers/auth");

const router = express.Router();

router.get('/',getPosts);
router.post('/post/new/:userId',requireSignin,createPost,createPostValidator);
router.get('/post/by/:userId',requireSignin,postsByUser);

//any routes contaning userId our app will firs execute userId
router.param("userId", userById)

module.exports=router;