import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiError } from "../utils/ApiError.js"
import { apiResponse } from "../utils/apiResponse.js"

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

export {registerUser}