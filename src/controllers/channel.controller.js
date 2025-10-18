import { asyncHandler } from "../utils/asyncHandler.js"
import {Channel} from "../models/channel.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiError } from "../utils/ApiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"


const createChannel = asyncHandler(async(req,res)=>{
    const {name , description} = req.body;
    const owner = req.user._id;
    const channel = await Channel.create({
        name:name,
        description:description,
        owner: owner
    })

    return res.status(200)
    .json(
        new apiResponse(200,channel,"Channel is active now")
    )
})

export {createChannel} 