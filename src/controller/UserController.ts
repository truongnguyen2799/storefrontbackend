import express, { Request, Response } from "express";
import { User, UserStore } from "../models/User";
import dotenv from "dotenv";
import { generateAccessToken, verifyAuthToken } from "../authen";

dotenv.config();

const userStore = new UserStore();

const login = async (request: Request, response: Response) => {
  const account: string = request.body.account;
  const password: string = request.body.password;
  const check = await userStore.login(account, password);
  if (check) {
    const token = generateAccessToken(account);
    response.json({ token });
  } else {
    response.status(400);
    response.json("Account or password not valid");
  }
};

const index = async (request: Request, response: Response) => {
  try {
    const users = await userStore.index();
    response.status(200);
    response.json(users);
  } catch (error) {
    response.status(401);
  }
};

const show = async (request: Request, response: Response) => {
  try {
    let id: number = parseInt(request.params.id);
    const user = await userStore.getById(id);
    response.json(user);
  } catch (error) {
    response.status(401);
  }
};

const insert = async (request: Request, response: Response) => {
  try {
    const user: User = {
      id: 0,
      fristname: request.body.fristname,
      lastname: request.body.lastname,
      password: request.body.password,
      account: request.body.account,
    };
    const result = await userStore.insert(user);
    console.log("🚀 ~ file: UserController.ts:54 ~ insert ~ result:", result)
    switch (result) {
      case -1:
        response.status(400);
        response.json("account existed");
        break;
      case 0:
        response.status(200);
        response.json("Success");
        break;
      default:
        break;
    }
  } catch (error) {
    response.status(400);
  }
};

const userController = (app: express.Application) => {
  app.post("/login", login);
  app.get("/user/all", verifyAuthToken, index);
  app.get("/user/:id", verifyAuthToken, show);
  app.post("/user/insert", insert);
};

export default userController;
