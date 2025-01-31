import express from "express";
// import bookingsRoutes from "./bookings";
// import propertiesRoutes from "./properties";
import groupsRoutes from "./groups";

const router = express.Router();

// router.use("/channex/bookings", bookingsRoutes);
// router.use("/channex/properties", propertiesRoutes);
router.use("/channex/groups", groupsRoutes);

export default router;
