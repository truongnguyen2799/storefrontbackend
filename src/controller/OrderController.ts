import express, { Request, Response } from "express";
import { OrderStore } from "../models/Order";
import { verifyAuthToken } from "../authen";

const orderStore = new OrderStore();

const getOrderById = async (request: Request, response: Response) => {
  try {
    let userId = parseInt(request.params.userid);
    const result = await orderStore.getByUser(userId);
    response.status(200);
    response.json(result);
  } catch (error) {
    response.status(400);
  }
};

const orderControllers = (app: express.Application) => {
  app.get("/order/:userid", verifyAuthToken, getOrderById);
};

export default orderControllers;
