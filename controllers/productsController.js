import Product from "../models/product.js";

export function createProduct(req,res){
    const newProductData=req.body;
    console.log(newProductData);