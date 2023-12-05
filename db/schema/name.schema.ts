import { Schema } from "mongoose";
import { IName } from "../types/db";

export const nameSchema = new Schema<IName>({
  first: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  middle: {
    type: String,
    required: false,
    default: "",
    minlength: 0,
    maxlength: 256,
  },
  last: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
});
