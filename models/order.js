import mongoose from 'mongoose';   

const orderSchema= mongoose.Schema({
    orderId:{
        type:String,
        required:true,
        unique:true,    
    },
    userEmail:{
        type:String,
        required:true
    },
    orderedItems:[
        {
            name:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },

            image:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
    totalAmount:{
        type:Number,
        required:true
    },
    orderDate:{
        type:Date,
        default:Date.now
    },
    paymentID:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"pending"
    },
    notes:{
        type:String
    },
    address:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;