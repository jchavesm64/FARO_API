import express from "express";
import getAvailability from "./get-availability";
import postAvailibility from "./post-availability";

const router = express.Router();

router.use("/", getAvailability);
router.use("/", postAvailibility);

export default router;
