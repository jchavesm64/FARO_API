import express from "express";
import getRoomTypes from "./get-room-types";
import getRoomTypeOptions from "./get-room-type-options";
import postRoomType from "./post-room-type";
import putRoomType from "./put-room-type";
import deleteRoomType from "./delete-room-type";

/**
 * Follow the docs:
 *
 * https://docs.channex.io/api-v.1-documentation/room-types-collection
 */
const router = express.Router();

router.use("/", getRoomTypes);
router.use("/", getRoomTypeOptions);
router.use("/", postRoomType);
router.use("/", putRoomType);
router.use("/", deleteRoomType);

export default router;
