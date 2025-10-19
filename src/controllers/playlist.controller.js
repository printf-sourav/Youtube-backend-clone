import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.models.js"
import {ApiError} from "../utils/ApiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Video} from "../models/video.models.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body
    if(!name){
        throw new ApiError(400,"Name is required")
    }
    //TODO: create playlist
    const userId= req.user?._id;

    const newPLayList = await Playlist.create({
        name:name,
        description:description,
        video: [],
        owner:userId
    })

    return res.status(200)
    .json(
        new apiResponse(200,newPLayList,"PLay list created")
    )

})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists
    if(!isValidObjectId(userId)){
        throw new ApiError(400,"ENter vaild userid");
    }
    const playlists= await Playlist.find({owner: userId}).select("-owner");
    if(playlists.length===0||!playlists){
        throw new ApiError(404,"PLaylist not exist")
    }
    return res.status(200)
    .json(new apiResponse(200,playlists,"Playlist Fetched"));

})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"ENter vaild userid");
    }
    const playlist= await Playlist.findById(playlistId);
    if(!playlist){
        throw new ApiError(404,"PLaylist not exist")
    }
    return res.status(200)
    .json(new apiResponse(200,playlist,"Playlist Fetched"));
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    if(!isValidObjectId(playlistId)||!isValidObjectId(videoId)){
        throw new ApiError(400,"ENter vaild playlist id and videoid");
    }
    const playlist = await Playlist.findById(playlistId);
    if(!playlist){
        throw new ApiError(404,"Playlist not found")
    }
    const video = await Video.findById(videoId);
    if(!video){
        throw new ApiError(404,"Video not found")
    }
    playlist.videos.push(video);
    await playlist.save();

    return res.status(200)
    .json(
        new apiResponse(
            200,
            {
                videos: playlist.videos
            },"Video added successfully"
        )
    )



})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist
    const playlist = await Playlist.findById(playlistId)
    if(!playlist){
        throw new apiResponse(404,"PLaylist not found");
    }
    const videoToDelete= playlist.videos.findIndex(video=>video.toString() === videoId);

    if(videoToDelete===-1){
        throw new ApiError(404,"Video deosnt exist")
    }

    playlist.videos.splice(videoToDelete,1);

    await playlist.save();

    return res.status(200)
    .json(
        new apiResponse(
            200,null,"Video removed"
        )
    )

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"ENter vaild playlist id ");
    }
    const playlist = await Playlist.deleteOne({_id:playlistId});
    
    if(playlist.deletedCount===0){
        throw new ApiError(404,"Playlist doesnt exist")
    }
    return res.status(200)
    .json(new apiResponse(
        200,null,"PLaylist deleted"
    ))

})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist
    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"ENter vaild playlist id ");
    }
    const playlist = await Playlist.findByIdAndUpdate(playlistId,{
        name:name,
        description:description
    },{new:true})

    if(!playlist){
        throw new ApiError(404,"PLaylist doesnt exist")
    }
    return res.status(200)
    .json(
        new apiResponse(200,{
            name:playlist.name,
            description:playlist.description
        },"Playlist updated")
    )


})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
