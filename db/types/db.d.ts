import { IUser } from "./db.d";
import mongoose, { Date } from "mongoose";
import { type } from "os";

export type IImage = {
  url: string;
  alt: string;
};

export type IUser = {
  name: IName;
  email: string;
  password: string;
  isAdmin?: boolean;
};

export type ICardInput = {
  title: string;
  description: string;
  image: IImage;
  price: Number;
};

export type ICard = ICardInput & {
  likes: string[];
  user_id: mongoose.Types.ObjectId;
  createdAt: Date;
};

export type ILogin = {
  email: string;
  password: string;
};

// export type IUserUpdate = {
//   isBusiness: boolean;
// };
