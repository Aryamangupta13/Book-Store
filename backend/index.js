import express from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
// import {Book} from './models/bookModel.js'
import router from "./routes/booksRoutes.js";
import cors from 'cors'

const app=express();


//middeleware to parse the request body
app.use(express.json());


//middeleware for handeling CORS Policy
//All origins allowed
// app.use(cors());
//only localhost://3000 allowed
app.use(
    cors({
        origin:'http://localhost:3000',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type']
    })
);

//get request on main page
app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send("welcome to the new world"); 
})

//middelware router on /books
app.use('/books',router);

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("connected to db");
    app.listen(PORT,()=>{
        console.log("listning at port 5555");
    })
})
.catch((err)=>{
    // console.log("here")
    console.log(err);
});
