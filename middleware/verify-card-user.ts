import { RequestHandler } from "express";
import { ApplicationError } from "../error/application-error";
import jwt from "jsonwebtoken";
import { RequestUser } from "../@types/express";
import { Card } from "../db/model/card.model";
import { User } from "../db/model/user.model";

export const verifyCardUser: RequestHandler = async (req, res, next) => {
  //get the Auth header:
  const header = req.headers.authorization;

  // if auth header does not exist - throw
  if (!header) {
    throw new ApplicationError(400, "No Auth Header");
  }

  //get the token from the header (after the space)
  const token = header.split(" ")[1];

  const secret = process.env.JWT_SECRET ?? "";

  try {
    //verify the token:
    const payload = jwt.verify(token, secret) as RequestUser;

    //pass the data to req.user
    req.user = payload;

    const userId = req.user?.id;
    const cardId = req.params.id;
    const existingCard = await Card.findById(cardId);
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user?.isAdmin) {
      return next();
    }

    if (existingCard?.user_id.toString() === userId) {
      return next();
    }
    throw new ApplicationError(
      401,
      "Only the user who created the business card or admin can delete this card"
    );
  } catch (e) {
    next(e);
  }
};
