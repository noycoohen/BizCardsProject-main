import Joi from "joi";
import { IImage, IUser } from "../db/types/db";
import { patterns } from "./regex-patterns";

export const joiUserSchema = Joi.object<IUser>({
  email: Joi.string().email().min(5).max(30).required(),
  password: Joi.string().pattern(patterns.password).min(7).required(),
  name: Joi.string().min(2).max(256).required(),
});
