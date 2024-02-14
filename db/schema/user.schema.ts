import { Schema } from "mongoose";
import { IUser } from "../types/db";


export const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  email: {
    unique: true,
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
});

//IUser{isAdmin?: boolean}
