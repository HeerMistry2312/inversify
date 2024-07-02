import mongoose, { Schema, Document, Types } from "mongoose";
import IArticle from "../interfaces/article.interface";
const articleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Article = mongoose.model<IArticle>("Article", articleSchema);
export default Article;
