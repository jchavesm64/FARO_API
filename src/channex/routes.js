import express from "express";

import bookingsRoutes from "./bookings";
import bookingRevisionsRoutes from "./booking-revisions";
import messageThreadsRoutes from "./message-threads";
import availabilityRoutes from "./availability";
import groupsRoutes from "./groups";
import restrictionsRoutes from "./restrictions";
import ratePlansRoutes from "./rate-plans";
import roomTypesRoutes from "./room-types";
import propertiesRoutes from "./properties";

const router = express.Router();

router.use("/channex/bookings", bookingsRoutes);
router.use("/channex/booking_revisions", bookingRevisionsRoutes);
router.use("/channex/message_threads", messageThreadsRoutes);
router.use("/channex/availability", availabilityRoutes);
router.use("/channex/restrictions", restrictionsRoutes);
router.use("/channex/rate_plans", ratePlansRoutes);
router.use("/channex/room_types", roomTypesRoutes);

router.use("/channex/properties", propertiesRoutes);
router.use("/channex/groups", groupsRoutes);

export default router;
