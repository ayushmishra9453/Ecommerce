const ErrorHander = require("../utils/errorHandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const User=require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail")
const crypto=require("crypto")
// register a user

exports.registerUser=catchAsyncError( async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sampleId",
            url:"profilepicUrl",
        },
    });

    const token=user.getJWTToken();
    // res.status(201).json({
    //     success:true,
    //     token,
    // })

    sendToken(user,201,res)

});

exports.loginUser= catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    // checking if email or password is not provided

    if(!email || !password){
        return next(new ErrorHander("Please enter email & Password",400))
    }

    const user=await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHander("invalid email & Password",401)) 
    }

    const isPasswordMatched=user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHander("invalid email & Password",401))    
    }
    const token=user.getJWTToken();

    // res.status(200).json({
    //     success:true,
    //     token
    // })

    sendToken(user,200,res)
})

// logout

exports.logout=catchAsyncError(async (req,res,next)=>{
   res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true
   })
    res.status(200).json({
        success:true,
        message:"logged out"
    });
})
// forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new ErrorHander("User not found", 404));
    }
    // Get ResetToken

    const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});


// reset password

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get user Details

exports.getUserDetails=catchAsyncError(async(req,res,next)=>{
  const user=await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user
  })
})

// Get user password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update your profile

exports.updateProfile=catchAsyncError(async(req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email
  }
  const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })
  res.status(200).json({
    success:true
  })
})


   
    
