import { Schema } from "mongoose";
import { IAddress } from "../types/db";

export const addressSchema = new Schema<IAddress>({
  city: {
    type: String,
    required: true,
    maxlength: 256,
  },
  country: {
    type: String,
    required: true,
    maxlength: 256,
  },
  houseNumber: {
    type: Number,
    required: true,
    min: 2,
    maxlength: 256,
  },
  zip: { type: Number, required: true, min: 2 },
  state: {
    type: String,
    required: false,
    default: "",
    maxlength: 30,
  },
  street: {
    type: String,
    required: true,
    maxlength: 256,
  },
});
