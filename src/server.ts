import express from "express";
import bodyParse from "body-parser";
import productControllers from "./controller/ProductController";
import userController from "./controller/UserController";

const app = express();
const port = 3000;

app.use(bodyParse.json());

app.get("/api", (req, res) => {
  res.send("Hello, world!");
});

productControllers(app);
userController(app);

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
