import express from "express";

import getGroups from "./get-groups";
import postGroup from "./post-group";
import putGroup from "./put-group";
import postGroupProperty from "./post-group-property";
import deleteGroupProperty from "./delete-group-property";

const router = express.Router();

router.use("/", getGroups);
router.use("/", postGroup);
router.use("/", putGroup);
router.use("/", postGroupProperty);
router.use("/", deleteGroupProperty);

export default router;
