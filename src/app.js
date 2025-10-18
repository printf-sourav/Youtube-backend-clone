import express from 'express'
import cookieParser from 'cookie-parser';
import cors from "cors"
const app =express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit: "16kb" 
}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())  

//routes import

import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import channelRouter from "./routes/channel.routes.js"
//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/video",videoRouter);
app.use("/api/v1/tweet",tweetRouter)
app.use("/api/v1/subscription",subscriptionRouter)
app.use("/api/v1/channel",channelRouter);
export {app};
