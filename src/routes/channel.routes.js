import { Router }  from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {createChannel} from "../controllers/channel.controller.js"
const router = Router();

router.route("/create").post(verifyJWT,createChannel);

export default router;