const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

const cloudinary = require("cloudinary");

// Create User
exports.createUser = catchAsyncErrors(async(req,res,next)=> {
    const { FlatNo } = req.body;
    const user1 = await User.find({FlatNo: FlatNo});
    if(user1 && Object.keys(user1).length){
        res.status(201).json({
            success:false,
            message: "User Already Exists"
        })
    }
    else{
        const {Password, OwnerName,RegisteredName,Block, Mobile,ParkingSlot,Email,Role } = req.body;
        const user = await User.create({
            FlatNo: FlatNo,
            Email: Email,
            Password: Password,
            OwnerName: OwnerName,
            RegisteredName: RegisteredName,
            Block: Block,
            Mobile: Mobile,
            ParkingSlot: ParkingSlot,
            Role: Role
        });
        //sendToken(user, 201, res);
        res.status(201).json({
            success: true,
            user 
        });
    }
});

// login User
exports.loginUser = catchAsyncErrors(async(req,res,next) => {
    const {FlatNo, Password} = req.body;
    const user = await User.find({FlatNo: FlatNo, Password: Password})
    if(!user && Object.keys(user).length){
        return next(new ErrorHandler("User does not exists",404));
    }
   // sendToken(user, 201, res);
    res.status(200).json({
        success: true,
        user
    });
})


// Get Single User
exports.getUser = catchAsyncErrors(async(req,res,next) => {
    const FlatNo = req.query.FlatNo;
    
    const user1 = await User.find({FlatNo: FlatNo})
    if(user1.length === 0){
        return next(new ErrorHandler("User does not exists",404));
    }
    res.status(200).json({
        success: true,
        user1
    });
});

// Get All users
exports.getAllusers = catchAsyncErrors(async(req,res) => {
    
        const data = await User.find()
        const users = data.map((ele)=>{
            
            return (
                {
                    FlatNo: ele.FlatNo,
                    OwnerName: ele.OwnerName,
                    RegisteredName: ele.RegisteredName,
                    ParkingSlot: ele.ParkingSlot,
                    Block: ele.Block,
                    Mobile: ele.Mobile,
                    Email: ele.Email,
                    Dues: ele.Dues
                }
            );
        })
        res.status(200).json({
            success: true,
            users
        });
    
})

// Update User
exports.updateUser = catchAsyncErrors(async(req,res,next)=> {
    let user1 = await User.find({FlatNo: req.query.user.FlatNo});
    if(!user1){
        return next(new ErrorHandler("User not found",404));
    }
   
    user1[0].FlatNo = req.query.user.FlatNo;
    user1[0].Email = req.query.user.Email; 
    user1[0].Mobile = req.query.user.Mobile; 
    user1[0].Block = req.query.user.Block; 
    user1[0].Dues = req.query.user.Dues;
    user1[0].ParkingSlot = req.query.user.ParkingSlot; 
    user1[0].OwnerName = req.query.user.OwnerName; 
    user1[0].RegisteredName = req.query.user.RegisteredName;
    
    user1[0].save();
    user1 = await User.find({FlatNo: req.query.user.FlatNo});
    
    res.status(200).json({
        success: true,
        message: "SuccessFully updated"
    })
});

// Delete User

exports.deleteUser = catchAsyncErrors(async(req,res,next) => {
    const user1 = await User.find({FlatNo: req.query.FlatNo});
    if(!user1) {
        return next(new ErrorHandler("User not found",404));
    }
    await user1[0].remove();
    res.status(200).json({
        success: true,
        message: "User Deletion successful"
    })
});