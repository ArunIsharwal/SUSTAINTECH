import express from "express";
import { getAllIssues, updateIssueStatus } from "../controllers/maintenance.controller.js";

const router = express.Router();

router.get("/get-all-issues", getAllIssues);
router.post("/update-status", updateIssueStatus);

export default router;
