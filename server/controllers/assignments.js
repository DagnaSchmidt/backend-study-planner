import express from "express";
import Assignment from "../models/assignment.js";
import mongoose from "mongoose";

export const assignmentsRouter = express.Router();

assignmentsRouter.post("/", (req, res) => {});
