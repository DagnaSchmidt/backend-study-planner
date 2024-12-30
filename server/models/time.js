import mongoose from "mongoose";

const timeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  time_start_date: {
    type: Date,
    required: true,
  },
  time_end_date: {
    type: Date,
    required: true,
  },
  task_id: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

timeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Time = mongoose.model("Time", timeSchema);
export default Time;
