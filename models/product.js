import mongoose from "mongoose";

const productSchema= mongoose.Schema({
    productId:{
        
    }

})
const Product=mongoose.model("Product",productSchema)
export default Product;