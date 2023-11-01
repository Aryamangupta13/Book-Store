import express from 'express';
// import {} from '../models/bookModel'
import {Book} from '../models/bookModel.js';

//here router used because to export the router use insted of app
const router=express.Router();

//Routes for save a book
router.post('/',async (req,res)=>{
    try{
       if(!req.body.title ||
           !req.body.author ||
           !req.body.publishYear
           ){
               return res.status(400).send({
                   message:"send all required feilds: title,author,publishyear"
               });
           }

           const newBook={
               title:req.body.title,
               author:req.body.author,
               publishYear:req.body.publishYear
           };

           const book=await Book.create(newBook);

           return res.status(201).send(book);
      // console.log(req.body);
   }
   catch(err){
       console.log(err);
       res.status(500).send({message:err.message}); 
   }
})

//Routes for get all books from databse
router.get("/",async(req,res)=>{
  try{    
      const books=await Book.find({});
      return res.status(200).json({
          count:books.length,
          data:books
      });
  }catch(err){
      console.log(err.message);
      res.status(500).send({message:err.message});
  }
});

//Route to get an book according to id
router.get("/:id",async(req,res)=>{
  try{    

      const {id}=req.params;
      
      const book=await Book.findById(id);

      return res.status(200).json(book);
  }catch(err){
      console.log(err.message);
      res.status(500).send({message:err.message});
  }
});

//Route for update a book
router.put("/:id",async(req,res)=>{
  try{
      if(!req.body.title ||
          !req.body.author ||
          !req.body.publishYear
          ){
              return res.status(400).send({
                  message:"send all required feilds: title,author,publishyear"
              });
          }

      const {id}=req.params;

      const result=await Book.findByIdAndUpdate(id,req.body);
      if(result){
          return res.status(200).send({message:"book updated successfully"});
      }
      else{
          return res.status(404).send({message:"book not found"});
      }
  }catch(err){
      console.log(err.message);
      res.send(500).send({message:err.message});
  }
})

//Route to delete an book
router.delete("/:id",async(req,res)=>{
  try{
      const {id}=req.params;

      const result=await Book.findByIdAndDelete(id);

      if(result){
          return res.status(200).send({message:"item deleted"});
      }
      else{
          return res.status(404).send({message:"item not found"});
      }

  }catch(err){
      console.log(err.message);
      res.status(500).send({message:err.message});
  }
})

export default router;
