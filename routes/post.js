const express=require('express');
const {getPosts, createPost,postsByUser,postById,isPoster,deletePost,updatePost}= require("../controllers/post");
const {createPostValidator}=require('../validator');
const {userById}=require("../controllers/user");
const {requireSignin}=require("../controllers/auth");

const router = express.Router();

router.get('/posts',getPosts);
router.post('/post/new/:userId',requireSignin,createPost,createPostValidator);
router.get('/post/by/:userId',requireSignin,postsByUser);
router.put('/post/:postId',requireSignin,isPoster,updatePost);
router.delete('/post/:postId',requireSignin,isPoster,deletePost);

//any routes contaning userId our app will firs execute userId
router.param("userId", userById);

router.param("postId", postById)

module.exports=router;