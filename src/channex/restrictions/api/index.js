import express from "express";

import getRestrictions from "./get-restrictions";
import postRestrictions from "./post-restrictions";

const router = express.Router();

router.use("/", getRestrictions);
router.use("/", postRestrictions);

export default router;
