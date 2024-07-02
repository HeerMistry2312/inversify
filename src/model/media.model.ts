import IMedia from "../interfaces/media.interface";
import mongoose, { Schema, Document, Types } from "mongoose";

const mediaSchema = new Schema<IMedia>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Media = mongoose.model<IMedia>("Media", mediaSchema);
export default Media;
