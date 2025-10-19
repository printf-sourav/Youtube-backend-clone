import mongoose, { isValidObjectId } from "mongoose"
import {Comment} from "../models/comment.model.js"
import { Channel } from "../models/channel.models.js"
import {User} from "../models/user.models.js"
import {Video} from "../models/video.models.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Enter valid video id")
    }
    const videoExists = await Video.exists({ _id: videoId });
    if (!videoExists) {
        throw new ApiError(404, "Video not found");
    }
    const PageNum = Number(page);
    const LimitNum = Number(limit);
    const skip = (PageNum-1)*LimitNum

    const [comments,total] = await Promise.all([
    Comment.find({video:videoId})
    .sort({createdAt: -1})
    .skip(skip)
    .limit(LimitNum)
    .populate("owner","username avatar")
    .lean(),await Comment.countDocuments({video:videoId})]);

    return res.status(200)
    .json(
        new apiResponse(200,
            {
                items:comments,
                page:PageNum,
                limit:LimitNum,
                total,
                pages:Math.ceil(total/LimitNum)
            },"All comments fetched")
    )
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId} = req.params
    const {content} = req.body
    if(!content){
        throw new ApiError(400,"Please provide content")
    }
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Enter valid video id")
    }
    const video = await Video.findById(videoId)
    if(!video){
        throw new ApiError(404,"Video not found");
    }
    const userId= req.user?._id

    const newComment = await Comment.create({
        content:content,
        video:video._id,
        owner: userId
    })

    return res.status(200)
    .json(
        new apiResponse(200,newComment,"comment successfully added")
    )

    
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params
    if(!isValidObjectId(commentId)){
        throw new ApiError(400,"Comment id is not vaild")
    }
    const {newContent} = req.body
    const comment = await Comment.findByIdAndUpdate(commentId,{
        $set:{
            content: newContent
        }
    },{new:true});
    if(!comment){
        throw new ApiError(404,"Comment not found")
    }

    return res.status(200)
    .json(
        new apiResponse(200,comment,"comment update successfully")
    )

    comment

})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params
    if(!isValidObjectId(commentId)){
        throw new ApiError(400,"Comment id is not vaild")
    }
    const delComment= await Comment.deleteOne({_id:commentId})
    if(delComment.deletedCount===0){
        throw new ApiError(400,"Comment not available")
    }

    return res.status(200)
    .json(
        new apiResponse(200,null,"Comment delete successfully")
    )
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
