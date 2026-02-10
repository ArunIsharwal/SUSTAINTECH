import jwt from "jsonwebtoken";
import Issues from "../models/Issues.js";

export const getAllIssues = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY);

    const issues = await Issues.find();

    res.status(200).json({ issues });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching issues",
      error: error.message,
    });
  }
};

export const updateIssueStatus = async (req, res) => {
  try {

    const { issueId, status } = req.body; 

    if (!["Pending", "Success"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const issue = await Issues.findByIdAndUpdate(
      issueId,
      { status },
      { new: true }
    );

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json({
      message: `Issue ${status} successfully`,
      issue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
