import { Schema } from "mongoose";
import { ICard } from "../types/db";
import { imageSchema } from "./image.schema";

export const cardSchema = new Schema<ICard>({
  title: { type: String, required: true, minlength: 2, maxlength: 256 },
  description: { type: String, required: true, minlength: 2, maxlength: 1024 },
  image: { type: imageSchema, required: true },
  price: { type: Number, required: true, minlength: 2 },
  likes: { type: [String], required: false, default: [] },
  createdAt: { type: Date, required: false, default: Date.now },
});
