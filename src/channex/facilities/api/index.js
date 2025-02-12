import express from "express";
import getFacilities from "./get-property-facilities";
import getRoomFacilities from "./get-room-facilities";

const router = express.Router();

router.use("/property_facilities", getFacilities);
router.use("/room_facilities", getRoomFacilities);

export default router;
