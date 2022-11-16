const Issue = require("../models/issueModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create User
exports.createIssue = catchAsyncErrors(async(req,res,next)=> {
    console.log(req.body);
    const { issue } = req.body;
    const issue1 = await Issue.find({Name: issue});
    if(issue1.length > 0){
        return next(new ErrorHandler("Issue Already Exists",404));
    }

    const i = await Issue.create({Name: issue});

    res.status(201).json({
        success: true
    })
});

// Get All Issues
exports.getAllIssues = catchAsyncErrors(async(req,res,next)=> {
    const issues = await Issue.find();

    res.status(201).json({
        success: true,
        issues
    })
});

exports.deleteIssue = catchAsyncErrors(async(req,res,next) => {
    const {issue} = req.body;

    const user1 = await Issue.find({Name: issue});
    if(!user1) {
        return next(new ErrorHandler("Issue not found",404));
    }
    await user1[0].remove();
    res.status(200).json({
        success: true,
        message: "Issue Deletion successful"
    })
});

