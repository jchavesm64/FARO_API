import express from "express";

import getProperties from "./get-properties";
import postProperties from "./post-properties";
import putProperties from "./put-properties";
import getPropertiesOptions from "./get-properties-options";
import deleteProperties from "./delete-properties";

const router = express.Router();

router.use("/", getProperties);
router.use("/", getPropertiesOptions);
router.use("/", postProperties);
router.use("/", putProperties);
router.use("/", deleteProperties);

export default router;
