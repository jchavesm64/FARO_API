import express from "express";

import bookingsRoutes from "./bookings/api";
import bookingRevisionsRoutes from "./booking-revisions/api";
import availabilityRoutes from "./availability/api";
import groupsRoutes from "./groups/api";
import restrictionsRoutes from "./restrictions/api";
import ratePlansRoutes from "./rate-plans/api";
import roomTypesRoutes from "./room-types/api";
import propertiesRoutes from "./properties/api";
import facilitiesRoutes from "./facilities/api";

const router = express.Router();

router.use("/channex/bookings", bookingsRoutes);
router.use("/channex/booking_revisions", bookingRevisionsRoutes);
router.use("/channex/availability", availabilityRoutes);
router.use("/channex/restrictions", restrictionsRoutes);
router.use("/channex/rate_plans", ratePlansRoutes);
router.use("/channex/room_types", roomTypesRoutes);
router.use("/channex", facilitiesRoutes);

router.use("/channex/properties", propertiesRoutes);
router.use("/channex/groups", groupsRoutes);

export default router;
