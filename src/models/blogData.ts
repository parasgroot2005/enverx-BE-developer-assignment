import mongoose from "mongoose";
import { Blog } from "./blog";

const BlogPostModel = new mongoose.Schema<Blog>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
}
)
export const BlogModel = mongoose.model<Blog>("Blog Info",BlogPostModel)
