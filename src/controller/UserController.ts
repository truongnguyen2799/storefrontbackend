import express, { Request, Response } from "express";
import { request } from "http";
import { User, UserStore } from "../models/User";

const userStore = new UserStore();

const index = async (request: Request, response: Response) => {
  const users = await userStore.index();
  console.log(users);
  response.json(users);
};

const userController = (app: express.Application) => {
  app.get("/user/all", index);
};

export default userController;
