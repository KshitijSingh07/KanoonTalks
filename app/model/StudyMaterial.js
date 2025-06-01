import mongoose from "mongoose";

const StudyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true }, // link to pdf/video or resource
  createdAt: { type: Date, default: Date.now },
});

const StudyMaterial = mongoose.models.StudyMaterial || mongoose.model("StudyMaterial", StudyMaterialSchema);

export default StudyMaterial;
