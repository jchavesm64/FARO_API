import express from "express";

import getBookingRevisions from "./get-booking-revisions";
import getBookingRevisionFeed from "./get-booking-revision-feed";
import postBookingRevisionAck from "./post-booking-revision-ack";

const router = express.Router();

router.use("/", postBookingRevisionAck);
router.use("/", getBookingRevisions);
router.use("/", getBookingRevisionFeed);

export default router;
