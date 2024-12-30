import express from "express";
import Time from "../models/time.js";

const timesRouter = express.Router();

// Get all time entries
timesRouter.get("/", async (req, res) => {
  try {
    const times = await Time.find({});
    res.json(times);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch time entries" });
  }
});

// Get time entries by user ID
timesRouter.get("/user/:userId", async (req, res) => {
  try {
    const times = await Time.find({ user_id: Number(req.params.userId) });
    res.json(times);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user's time entries" });
  }
});

// Get time entries by task ID
timesRouter.get("/task/:taskId", async (req, res) => {
  try {
    const times = await Time.find({ task_id: Number(req.params.taskId) });
    res.json(times);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task's time entries" });
  }
});

// Get time entries within a date range
timesRouter.get("/range", async (req, res) => {
  try {
    const { start_date, end_date, user_id } = req.query;
    const query = {
      user_id: Number(user_id),
      time_start_date: { $gte: new Date(start_date) },
      time_end_date: { $lte: new Date(end_date) },
    };
    const times = await Time.find(query);
    res.json(times);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch time entries in range" });
  }
});

// Create a new time entry
timesRouter.post("/", async (req, res) => {
  try {
    const { id, user_id, task_id, time_start_date, time_end_date } = req.body;

    const newTime = new Time({
      id,
      user_id: Number(user_id),
      task_id: Number(task_id),
      time_start_date: new Date(time_start_date),
      time_end_date: new Date(time_end_date),
    });

    const savedTime = await newTime.save();
    res.status(201).json(savedTime);
  } catch (error) {
    res.status(400).json({ error: "Failed to create time entry" });
  }
});

// Update a time entry
timesRouter.put("/:id", async (req, res) => {
  try {
    const { time_start_date, time_end_date } = req.body;
    const timeId = Number(req.params.id);

    const updatedTime = await Time.findOneAndUpdate(
      { id: timeId },
      {
        time_start_date: new Date(time_start_date),
        time_end_date: new Date(time_end_date),
      },
      { new: true }
    );

    if (!updatedTime) {
      return res.status(404).json({ error: "Time entry not found" });
    }

    res.json(updatedTime);
  } catch (error) {
    res.status(400).json({ error: "Failed to update time entry" });
  }
});

// Delete a time entry
timesRouter.delete("/:id", async (req, res) => {
  try {
    const timeId = Number(req.params.id);
    const deletedTime = await Time.findOneAndDelete({ id: timeId });

    if (!deletedTime) {
      return res.status(404).json({ error: "Time entry not found" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete time entry" });
  }
});

export default timesRouter;

