import mongoose from "mongoose";

const UserCourseSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Clerk user id
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.UserCourse || mongoose.model("UserCourse", UserCourseSchema);
