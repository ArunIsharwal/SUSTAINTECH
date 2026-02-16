import express from "express";
import {
  getAllEvents,
  giveGreenPoint,
  updateEventStatus,
} from "../controllers/staff.controller.js";

const router = express.Router();

router.get("/get-all-events", getAllEvents);
router.post("/event/status", updateEventStatus);
router.post("/give-green-point", giveGreenPoint);

export default router;
