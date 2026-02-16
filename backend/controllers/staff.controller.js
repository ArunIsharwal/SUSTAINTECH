import Event from "../models/Event.js";
import jwt from "jsonwebtoken";
import Issues from "../models/Issues.js";
import User from "../models/User.js";

export const getAllEvents = async (req, res) => {
  try {
    // const { userId } = jwt.verify(req.cookie.token, process.env.JWT_SECRET_KEY);

    const events = await Event.find({});
    console.log("Staff");

    if (!events.length) {
      return res.status(404).json({
        message: "No events found for this student",
      });
    }

    res.status(200).json({
      events,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching events",
      error: error.message,
    });
  }
};

export const updateEventStatus = async (req, res) => {
  try {
    const { eventId, status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const event = await Event.findByIdAndUpdate(
      eventId,
      { status },
      { new: true },
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({
      message: `Event ${status} successfully`,
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const giveGreenPoint = async (req, res) => {
  try {
    const { issueId, points } = req.body;

    if (!issueId || !points) {
      return res.status(400).json({
        success: false,
        message: "Issue ID and points are required",
      });
    }

    // find issue
    const issue = await Issues.findById(issueId);
    issue.pointsGiven = true;
    await issue.save();

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    // find student
    const student = await User.findById(issue.studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // add points
    student.greenPoint = (student.greenPoint || 0) + Number(points);

    await student.save();

    return res.status(200).json({
      success: true,
      message: "Green points added successfully",
      greenPoint: student.greenPoint,
    });
  } catch (error) {
    console.error(error);
    return;
  }
};
