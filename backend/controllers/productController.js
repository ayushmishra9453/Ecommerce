// const Product=require("../models/productModel");
// const ErrorHander = require("../utils/errorHandler");
// const catchAsyncError=require("../middleware/catchAsyncError");
// const ApiFeatures = require("../utils/apiFeatures");
 


// // create Product  ---> Admin

// exports.createProduct=catchAsyncError(async(req,res,next)=>{
//     req.body.user=req.user.id
//     const product= await Product.create(req.body);

//     res.status(201).json(
//         {
//             success:true,
//             product
//         }
//     )
// });

// // Get all Product
// exports.getAllProducts=catchAsyncError(async(req,resp)=>{
//     const resultPerPage=5;
//     const productCount=await Product.countDocuments()
//    const apiFeatures=new ApiFeatures(Product.find(),req.query)
//    .search()
//    .filter()
//    .pagination(resultPerPage)
//     const products=await apiFeatures.query;
//     resp.status(200).json({
//         success:true,
//         products
//     })
// }
// )

// // get product detail
 
// exports.getProductDetails=catchAsyncError(async (req,resp,next)=>{
//     const product=await Product.findById(req.params.id);
//     if(!product){
//         return next(new ErrorHander("product not found",404));
//      }
//      resp.status(200).json({
//         success:true,
//         product,
//         productCount
//      })

// }
// )

// // update product  --->Admin

// exports.updateProducts=catchAsyncError(async(req,resp,next)=>{
//  let product= await Product.findById(req.params.id);
//  if(!product){
//     return next(new ErrorHander("product not found",404));
//  }
//  product=await Product.findByIdAndUpdate(req.params.id,req.body,{
//     new:true,
//     runValidators:true,
//     useFindAndModify:false
//  });
//  resp.status(200).json({
//     success:true,
//     product
//  })
// }
// )

// // delete product


// exports.deleteProducts = catchAsyncError(async (req, resp, next) => {
//     try {
//         const deletedProduct = await Product.findByIdAndDelete(req.params.id);

//         if(!deletedProduct){
//             return next(new ErrorHander("product not found",404));
//          }

//         resp.status(200).json({
//             success: true,
//             message: "Product deleted successfully",
//         });
//     } catch (error) {
//         // Handle other potential errors
//         resp.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message,
//         });
//     }
// }
// )


exports.getAllProducts=(req,res)=>{
    res.status(200).json(
      {
        message:"Route is working fine"
      }  
    )
}