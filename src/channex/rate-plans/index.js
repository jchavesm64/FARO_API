import express from "express";
import getRatePlan from "./get-rate-plan";
import getOptionsRatePlan from "./get-options-rate-plan";
import postRatePlan from "./post-rate-plan";
import putRatePlan from "./put-rate-plan";
import deleteRatePlan from "./delete-rate-plan";

const router = express.Router();

router.use("/", getRatePlan);
router.use("/", getOptionsRatePlan);
router.use("/", postRatePlan);
router.use("/", putRatePlan);
router.use("/", deleteRatePlan);

export default router;
