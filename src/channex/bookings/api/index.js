import express from "express";

import getBookings from "./get-bookings";
import postBookingInvalidCard from "./post-booking-invalid-card";
import postBookingNoShow from "./post-booking-no-show";

const router = express.Router();

router.use("/", getBookings);
router.use("/", postBookingInvalidCard);
router.use("/", postBookingNoShow);

export default router;
