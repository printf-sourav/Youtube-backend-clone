import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.models.js"
import { Video } from "../models/video.models.js"
import { Comment } from "../models/comment.model.js"
import { Tweet } from "../models/tweet.models.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"ENter valid videoid")
    }
    //TODO: toggle like on video
    const userId= req.user?._id
    const video = await Video.findOne({_id:videoId})
    if(!video){
        throw new ApiError(404,"Video not found");
    }
    const existingLike = await Like.findOne({likedBy: userId,video:videoId});
    if(existingLike){
        await Like.deleteOne({likedBy:userId,video:videoId})
        return res.status(200)
        .json(
            new apiResponse(200,null,"Video Unliked")
        )
    }
    else{
        const newLike = await Like.create({
            video:video._id,
            owner:userId,
        })

        return res.status(200)
        .json(
            new apiResponse(200,newLike,"Video liked")
        )
    }

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    if(!isValidObjectId(commentId)){
        throw new ApiError(400,"ENter valid commentid")
    }
    //TODO: toggle like on comment
    const userId= req.user?._id
    const comment = await Comment.findOne({_id:commentId})
    if(!comment){
        throw new ApiError(404,"Comment not found");
    }
    const existingCommentLike = await Like.findOne({comment:commentId,likedBy: userId})

    if(existingCommentLike){
        await Like.deleteOne({likedBy:userId,comment:commentId})
        return res.status(200)
        .json(
            new apiResponse(200,null,"Comment Unliked")
        )
    }
    else{
        const newLike = await Like.create({
            comment:commentId,
            owner:userId,
        })

        return res.status(200)
        .json(
            new apiResponse(200,newLike,"Comment liked")
        )
    }

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400,"ENter valid commentid")
    }
    //TODO: toggle like on tweet
    const userId= req.user?._id
    const tweet = await Tweet.findOne({_id:tweetId})
    if(!tweet){
        throw new ApiError(404,"Tweet not found");
    }
    const existingTweetLike = await Like.findOne({tweet:tweetId,likedBy: userId})

    if(existingTweetLike){
        await Like.deleteOne({likedBy:userId,tweet:tweetId})
        return res.status(200)
        .json(
            new apiResponse(200,null,"tweet Unliked")
        )
    }
    else{
        const newLike = await Like.create({
            tweet:tweetId,
            owner:userId,
        })

        return res.status(200)
        .json(
            new apiResponse(200,newLike,"tweet liked")
        )
    }

}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const userId= req.user?._id
    if(!userId){
        throw new ApiError(404,"User not found")
    }
    const allLikes = await Like.find({likedBy:userId});
    return res.status(200)
    .json(
        new apiResponse(200,allLikes,"All likes fetched")
    )
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}