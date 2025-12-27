import Product from '../models/product.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

async function getProducts(req,res){
  try{
  const productList= await Product.find()
  res.json({list:productList})
  }catch(err){
    res.json({message:"error in fetching products", error:err})
  }
    }

async function createProduct(req,res){
  console.log(req,User)
  if(req.user==null){
    res.json({message:"You are not Logged in"})
    return;
  }
   if(req.user.type!=="admin"){
    res.json({message:"You are not an admin"})
    return;
    }

  
   const newProduct=new Product(req.body) 
    newProduct.save().then(()=>{
        res.json({message:"product added successfully from product router"})    
    }).catch((err)=>{
      res.json({message:"product not created",error:err})
    } )
  } 

function deleteProduct (req,res){
    Product.deleteone({name:req.params.names}).then(()=>{ 
      res.json({message:"product deleted successfully"})


}  
).catch(()=>{
  res.json({message:"product not deleted"})             
} )
}   

function getProductByName(req,res){
  const name=req.params.name;
  Product.find({name:name}).then((productsList)=>{  
    res.json({list:productsList})
    
}
).catch(()=>{
  res.json({message:"product not found  "})             
} )
}

    export {getProducts, createProduct, deleteProduct, getProductByName};   