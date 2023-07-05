import express from "express";
import bodyParse from "body-parser";
import productControllers from "./controller/ProductController";
import userController from "./controller/UserController";
import orderController from "./controller/OrderController";

const app = express();
const port = 3000;

app.use(bodyParse.json());

productControllers(app);
userController(app);
orderController(app);

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;