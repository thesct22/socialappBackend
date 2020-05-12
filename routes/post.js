const express=require('express');
const {getPosts, createPost}= require("../controllers/post");
const {createPostValidator}=require('../validator');
const {requireSignin}=require("../controllers/auth");

const router = express.Router();

router.get('/',requireSignin,getPosts);
router.post('/post',createPostValidator, createPost);

//any routes contaning userId our app will firs execute userId
router.param("userId", userById)

module.exports=router;