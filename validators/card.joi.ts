import Joi from "joi";
import { IImage, ICardInput } from "../db/types/db";
import { patterns } from "./regex-patterns";

export const joiCardSchema = Joi.object<ICardInput>({
  title: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  price: Joi.number().min(2).required(),
  image: Joi.object<IImage>({
    alt: Joi.string().min(2).max(256),
    url: Joi.string().uri().min(14).max(256),
  }),
});
