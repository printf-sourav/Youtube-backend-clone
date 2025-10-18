import mongoose  from "mongoose";
import { Schema } from "mongoose";

const channelSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
})

export const Channel = mongoose.model("Channel",channelSchema);