// const express=require("express")
// const app=express();
// const cookieParser=require("cookie-parser")
// const errorMiddleware=require("./middleware/error")
// app.use(express.json())
// app.use(cookieParser())
// // import routes
// const product=require("./routes/productRoutes");
// const user=require("./routes/userRoutes")
// app.use("/api/v1",product)
// app.use("/api/v1",user)

// // middleware for error
// app.use(errorMiddleware);

// module.exports=app



const express=require('express')
const app=express();
app.use(express.json())
// Router imports

const product=require("./routes/productRoutes")
app.use("/api/v1",product)

module.exports=app;