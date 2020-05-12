const express= require('express');
const app=express();
const bodyParser=require('body-parser');
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


//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/",postRoutes);
app.use("/",authRoutes)



const port=process.env.PORT;
app.listen(port, ()=>{
    console.log(`A NodeJs API is litening on port: ${port}`);
});