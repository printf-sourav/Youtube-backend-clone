import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiError } from "../utils/ApiError.js"
import { apiResponse } from "../utils/apiResponse.js"


const generateAccessAndRefreshToken = async(userId)=>{
    try{
        const user = await User.findOne(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})
        return{accessToken,refreshToken}
    }
    catch(error){
        throw new ApiError(500,error?.message||"Something went wrong while generating tokens")
    }
}
const registerUser = asyncHandler(async(req,res)=>{
    //get user details from frontend
    //validation-not empty
    //check if user already exist
    //check for images and avatar
    //upload them to cloudinary\
    // create usser object - enter entry in db
    // remove passowrd and refresy token from response
    //check for user creation
    // return response

    const {fullname,email,username,password}=req.body
    console.log("email:",email)

    if([fullname,email,username,password].some((field)=>(
        field?.trim() === "")
    )
   ){
        throw new ApiError(400,"Full name is required")
    }
    const existedUser = await User.findOne({
        $or: [{email},{username}]
    })
    if(existedUser){
        throw new ApiError(409,"User already exists")
    }
    const avatarLocalPath=req.files?.avatar?.[0]?.path
    const coverImageLocalPath=req.files?.coverImage?.[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar pic req ")
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar is required")
    }

    const user = await User.create({
        fullname,
        avatar : avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()

    })
    const UserCheck = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!UserCheck){
        throw new ApiError(500,"SOmething went wrong while registering the user")
    }
    return res.status(201).json(
        new apiResponse(200,UserCheck, "User register successfully")
    )

})

const loginUser = asyncHandler(async(req,res)=>{
    // req body -> data
    // username or email
    // find username or password
    // decrypt password and password check
    //access and refresh token
    //send cookies

    const {email,username,password} = req.body

    if(!(username || email)){
        throw new ApiError(400,"USERNAME OR EMAIL IS REQUIRED")
    }
    
    const user = await User.findOne({
        $or: [{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"User not found")
    }

    const isPasswordVaild = await user.isPasswordCorrect(password)

    if(!password){
        throw new ApiError(401,"Password is incorrect")
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly : true,
        secure: true
    }
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(
            200,
            {
                user: loggedInUser,accessToken,refreshToken
            },
            "User logged In Successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                refreshToken: undefined
            }
        },
        {
            new:true
        },
    )

    const options = {
        httpOnly : true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToke",options)
    .json(new apiResponse(200,{},"user logged out"))
})
export {registerUser,loginUser,logoutUser}