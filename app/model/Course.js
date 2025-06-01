import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    content: String, // full content
    image: String,
    price: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
