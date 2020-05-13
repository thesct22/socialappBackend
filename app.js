const express= require('express');
const app=express();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const morgan=require("morgan");
const mongoose=require("mongoose");
const expressValidator=require('express-validator');
const dotenv= require("dotenv");
dotenv.config();



//db
//MONGO_URI=mongodb://localhost/nodeapi
mongoose.connect(
    process.env.MONGO_URI,
    { useUnifiedTopology: true, useNewUrlParser: true }    
).then(()=>console.log("DB Connected"));

mongoose.connection.on('error',err=>{
    console.log(`DB Connection error: ${err.message}`);
});



//bring in routes
const postRoutes=require('./routes/post');
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');


//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/",postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error:"Unauthorizd!"});
  }
});



const port=process.env.PORT;
app.listen(port, ()=>{
    console.log(`A NodeJs API is litening on port: ${port}`);
});