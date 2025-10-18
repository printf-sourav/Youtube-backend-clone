import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.models.js"
import {User} from "../models/user.models.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {content} = req.body
    if(!content){
        throw new ApiError(
            400,"Tweet is required"
        )
    }
    const tweet = await Tweet.create({
        content : content,
        owner: req.body?._id
    })
    return res.status(200)
    .json(
        new apiResponse(
            201,tweet,"Created"
        )
    )
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const userId = req.body?._id
    const tweets = await Tweet.find({owner:userId})
    if(!tweets || tweets.length == 0){
        return new ApiError(404,"Tweet not found")
    }
    return res.status(200)
    .json(
        new apiResponse(200,tweets,"Successful")
    )
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const {tweetId} = req.params
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400,"ENter valid id");
    }
    const {newContent} = req.body
    const tweet = await Tweet.findByIdAndUpdate(tweetId,{
        $set:{
            content: newContent
        }
    },{new:true})
    if(!tweet){
        return new ApiError(404,"Tweet not found")
    }
    return res.status(200)
    .json(
        new apiResponse(
            200,tweet,"tweet updated"
        )
    )
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const {tweetId} = req.params
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400,"ENter valid id");
    }
    const tweet = await Tweet.deleteOne({_id:tweetId});
    if(tweet.deletedCount === 0){
        throw new ApiError(404,"Tweet not found")
    }

    return res.status(200)
    .json(
        new apiResponse(
            200,tweet,"Tweet deleted successfully"
        )
    )
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
