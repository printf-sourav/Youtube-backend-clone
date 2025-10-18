import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.models.js"
import {User} from "../models/user.models.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js"
import { response } from "express"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const filter = {
        isPublished: true
    }
    if(userId){
        filter.owner = userId; 
    }
    if(query){
        filter.$or = [
            {title: {$regex: query ,$options: 'i'}},
            {description: {$regex:query , $options: 'i'}}
        ]
    }
    const skip = (pageNum-1)*limitNum;

    const videos = await Video.find(filter)
    .skip(skip)
    .limit(limitNum)
    .sort({createdAt: -1})
    if(!videos){
        throw new ApiError(400,"Video Not found");
    }

    const totalVideos = await Video.countDocuments(filter);

    return res.status(200).json(
        new apiResponse(
            200,
            {
                videos,
                page: pageNum,
                totalPages: Math.ceil(totalVideos/limitNum),
                totalVideos
            },"Videos fetched successfully"
        )
    )
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
    if(!title || !description){
        throw new ApiError(400,"Title and description is required");
    }
        const videoFile = req.files?.videoFile?.[0].path
        const thumbnail = req.files?.thumbnail?.[0].path

        if(!videoFile){
            throw new ApiError(400,"Video is required")
        }
        if(!thumbnail){
            throw new ApiError(400,"Thumbnail is required")
        }
        const videoUpload = await uploadOnCloudinary(videoFile);
        const thumbnailUpload = await uploadOnCloudinary(thumbnail);


        const video = await Video.create({
            videoFile: videoUpload.url,
            thumbnail: thumbnailUpload.url,
            title,
            description,
            time: videoUpload.duration || 0,
            owner: req.user._id
        })
        return res.status(200)
        .json(
            new apiResponse(
                200,video,"Video published successfully"
                
            )
        )
    
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Enter valid videoId");
    }
    const video = await Video.findOne({_id:videoId}); 
    if(!video){
        throw new ApiError(404,"Video not found");
    }
    return res.status(200)
    .json(
        new apiResponse(
            200,
            {
                url: video.videoFile
            },
            "Video fetched properly"
        )
    )
    
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Enter valid videoId");
    }
    const {title,description,thumbnail}= req.body;

    if(!title && !description && !thumbnail){
        throw new ApiError(400,"Details is required");
    }
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (thumbnail) updateData.thumbnail = thumbnail;

    const video = await Video.findByIdAndUpdate(
        videoId,{
            $set:updateData
        },{new:true}
    );

    if(!video){
        throw new ApiError(404,"Enter vaild video id");
    }

    return res.status(200)
    .json(
        new apiResponse(
            200,video,"Video updated succesfully"
        )
    )
    

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"ENter valid id");
    }

    const video = await Video.deleteOne({_id:videoId});

    if(video.deletedCount == 0){
        throw new ApiError(404,"Video does not exist");
    }

    return res.status(200)
    .json(
        new apiResponse(
            200,video,"Video deleted successfully"
        )
    )

})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"ENter valid id");
    }
    const video = await Video.findById(videoId);
    if(!video){
        throw new ApiError(404,"Video not found");
    }
    video.isPublished = !video.isPublished;
    await video.save();
    const response = video.isPublished ? "enabled" : "disabled";;
    
    return res.status(200)
    .json(
        new apiResponse(
            200,{isPublished:video.isPublished},`Successfully ${response}`
        )
    )

})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
