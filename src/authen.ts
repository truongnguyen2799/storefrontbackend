import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction } from "express";

dotenv.config();

const { JWT_SECRET } = process.env;

const generateAccessToken = (account: string): string => {
  return jwt.sign(
    {
      data: account,
    },
    JSON.stringify(JWT_SECRET),
    { expiresIn: "600s" }
  );
};

const verifyAuthToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, JSON.stringify(JWT_SECRET));
    next();
  } catch (error) {
    response.status(401);
    response.json("Need Login");
  }
};

export { generateAccessToken, verifyAuthToken };
