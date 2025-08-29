const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter description"],
    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        maxLength:[8,"Price cannot exceed 8 character"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
            type:String,
            required:[true,"please enter product category"], 
    },
    stock:{
        type:String,
        required:[true,"please enter product current stock"], 
        maxLength:[4,"Stock cannot exceed 4 character"],
        default:1,
},
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        Name:{
            type:String,
            required:true, 
    },
    rating:{
        type:Number,
        required:true,
    },
    Comment:{
        type:String,
        required:true
    }
    }
   ],
   user:{
     type:mongoose.Schema.ObjectId,
     ref:"User",
     required:true
   },
   createdAt:{
    type:Date,
    default:Date.now
   }


})

module.exports=mongoose.model("Product",productSchema);