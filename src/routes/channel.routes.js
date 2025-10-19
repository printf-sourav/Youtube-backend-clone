import { Router }  from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {createChannel,deleteChannel} from "../controllers/channel.controller.js"
const router = Router();

router.route("/create").post(verifyJWT,createChannel);
router.route("/delete/:channelId").delete(verifyJWT,deleteChannel);


export default router;