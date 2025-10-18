import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.models.js"
import { Subscription } from "../models/subscription.models.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import { Channel } from "../models/channel.models.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription
    if(!isValidObjectId(channelId)){
        throw new ApiError(400,"Enter valid channel id");
    }
    const userId = req.user?._id;
    const existingSubscriber = await Subscription.findOne({subscriber:userId,channel:channelId});

    if(existingSubscriber){
        await Subscription.deleteOne({_id:existingSubscriber._id})
        return res.status(200)
        .json(
            new apiResponse(200,null,"Unsubscribed")
        )
    }
    else{
        const subscriber= await Subscription.create({
            subscriber: userId, channel : channelId
        })
        return res.status(200).json(
           new apiResponse(200,subscriber,"Subscribed")
);
    }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    if(!isValidObjectId(channelId)){
        throw new ApiError(400,"Enter valid channel id");
    }
    const channel = await Channel.findById(channelId);
    if(!channelId){
        throw new ApiError(404,"channel not found");
    }
    const subscribers = await Subscription.find({channel:channelId}).populate('subscriber','username email')

    return res.status(200)
    .json(
        new apiResponse(200,subscribers,"Allsubscribers")
    )
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    if(!isValidObjectId(subscriberId)){
        throw new ApiError(400,"Enter valid subscriber id");
    }
    const channels = await Subscription.find({subscriber: subscriberId})
    .populate('channel','name');
    if(!channels || channels.length == 0){
        throw new ApiError(404,"No subscribed channels found");
    }

    return res.status(200)
    .json(
        new apiResponse(200,channels,"All channels fetched")
    )

})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}