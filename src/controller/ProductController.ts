import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/Product";
import { verifyAuthToken } from "../authen";

const productStore = new ProductStore();

const getAllProduct = async (request: Request, response: Response) => {
  const products = await productStore.index();
  console.log(products);
  response.json(products);
};

const getProductById = async (request: Request, response: Response) => {
  try {
    let id: number = parseInt(request.params.id);
    const product: Product = await productStore.show(id);
    response.json(product);
  } catch (error) {
    response.status(400);
    response.send("Product id not valid");
  }
};

const insertProduct = async (request: Request, response: Response) => {
  try {
    const product: Product = {
      id: 0,
      name: request.body.name,
      price: parseFloat(request.body.price),
      category: isNaN(request.body.category) ? request.body.category : "",
    };
    const result = await productStore.insert(product);
    response.status(200);
    response.json(result);
  } catch (error) {
    response.status(400);
    response.send("Param not valid");
  }
};

const productControllers = (app: express.Application) => {
  app.get("/product/all", getAllProduct);
  app.get("/product/:id", getProductById);
  app.post("/product/insert", verifyAuthToken, insertProduct);
};

export default productControllers;
