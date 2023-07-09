import supertest from "supertest";
import Client from "../../database";
import app from "../../server";
import { User, UserStore } from "../../models/User";
import { Product, ProductStore } from "../../models/Product";
const request = supertest(app);

const userStore = new UserStore();

describe("Test api Product", () => {
  const user: User = {
    id: 0,
    firstname: "TestProduct",
    lastname: "TestProduct",
    password: "TestProduct",
    account: "TestProduct",
  };
  beforeAll(async () => {
    userStore.insert(user);
  });

  describe("Test api /product/all", () => {
    it("/product/all", async () => {
      const response = await request.get("/product/all");
      expect(response.status).toBe(200);
    });
  });

  describe("Test api /product/show/:id", () => {
    it("/product/show/:id", async () => {
      const response = await request.get("/product/show/1");
      expect(response.status).toBe(200);
    });
  });

  describe("Test api /product/insert", () => {
    it("/product/insert", async () => {
      const login = await request.post("/login").send({
        account: user.account,
        password: user.password,
      });
      const token = login.body.token;
      const response = await request
        .post("/product/insert")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Produc Test",
          price: 123,
          category: "",
        });
      expect(response.status).toBe(200);
    });
  });

  describe("Test api /product/update", () => {
    it("/product/update", async () => {
      const login = await request.post("/login").send({
        account: user.account,
        password: user.password,
      });
      const token = login.body.token;
      const response = await request
        .put("/product/update")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: 1,
          name: "Produc Test",
          price: 123,
          category: "",
        });
      expect(response.status).toBe(200);
    });
  });

  describe("Test api /product/delete", () => {
    it("failed", async () => {
      const login = await request.post("/login").send({
        account: user.account,
        password: user.password,
      });
      const token = login.body.token;
      const response = await request
        .delete("/product/a")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(400);
    });

    it("success", async () => {
      const login = await request.post("/login").send({
        account: user.account,
        password: user.password,
      });
      const token = login.body.token;
      const response = await request
        .delete("/product/999")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });

  afterAll(async () => {
    const conn = await Client.connect();
    const sql = `DELETE FROM "User" WHERE account = ($1)`;
    await conn.query(sql, [user.account]);
    conn.release();
  });
});
