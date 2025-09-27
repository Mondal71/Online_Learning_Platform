import mongoose, { Types } from "mongoose";

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  videoUrl: {
    type: String,
    require: true
  },
  description: { type: String },
  order: { type: Number }
})

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: String
  },
  tags: [{ type: String }],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  lectures: [lectureSchema],
  status: {
    type: String,
    enum: ["draft", "pending", "approved"],
    default: "pending"
  }
}, { timestamps: true })

export const Course = mongoose.model("Course", courseSchema)