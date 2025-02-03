import express from "express";

import getBookings from "./get-bookings";
import postBookingInvalidCard from "./post-booking-invalid-card";
import postBookingNoShow from "./post-booking-no-show";
import getBookingMessages from "./get-booking-messages";
import postBookingMessages from "./post-booking-messages";

const router = express.Router();

router.use("/", getBookings);
router.use("/", postBookingInvalidCard);
router.use("/", postBookingNoShow);
router.use("/", getBookingMessages);
router.use("/", postBookingMessages);

export default router;
