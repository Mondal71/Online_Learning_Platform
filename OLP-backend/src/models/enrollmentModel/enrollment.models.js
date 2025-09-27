import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  lectureId: { type: mongoose.Schema.Types.ObjectId },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: { type: Date }
})

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    require: true
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  progress: [progressSchema]
}, { timestamps: true })

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema)