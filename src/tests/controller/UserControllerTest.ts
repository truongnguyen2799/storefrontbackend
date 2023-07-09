import supertest from "supertest";
import Client from "../../database";
import app from "../../server";
import { User, UserStore } from "../../models/User";

const request = supertest(app);
const userStore = new UserStore();

describe("Test api user", () => {
  const user: User = {
    id: 0,
    firstname: "TestUser",
    lastname: "TestUser",
    password: "TestUser",
    account: "TestUser",
  };

  describe("Test api login", () => {
    beforeEach(async () => {
      await userStore.insert(user);
    });
    it("Login", async () => {
      const response = await request.post("/login").send({
        account: user.account,
        password: user.password,
      });
      expect(response.status).toBe(200);
    });
    afterEach(async () => {
      const conn = await Client.connect();
      const sql = `DELETE FROM "User" WHERE account = ($1)`;
      await conn.query(sql, [user.account]);
      conn.release();
    });
  });

  describe("Test api failed without token", () => {
    it("Without Token:", async () => {
      const response = await request.get("/user/all");
      expect(response.status).toBe(401);
      expect(response.body).toBe("Need Login");
    });
  });

  describe("Test api /user/all", () => {
    beforeEach(async () => {
      await userStore.insert(user);
    });
    it("/user/all", async () => {
      const login = await request.post("/login").send({
        account: user.account,
        password: user.password,
      });
      const token = login.body.token;
      const response = await request
        .get("/user/all")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
    afterEach(async () => {
      const conn = await Client.connect();
      const sql = `DELETE FROM "User" WHERE account = ($1)`;
      await conn.query(sql, [user.account]);
      conn.release();
    });
  });

  describe("Test api /user/show/:id", () => {
    beforeEach(async () => {
      await userStore.insert(user);
    });
    it("/user/show/:id", async () => {
      const login = await request.post("/login").send({
        account: user.account,
        password: user.password,
      });
      const token = login.body.token;
      const response = await request
        .get("/user/show/9999")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
    afterEach(async () => {
      const conn = await Client.connect();
      const sql = `DELETE FROM "User" WHERE account = ($1)`;
      await conn.query(sql, [user.account]);
      conn.release();
    });
  });

  describe("Test api insert user ", () => {
    it("Register", async () => {
      const response = await request.post("/user/insert").send({
        firstname: "TestUser",
        lastname: "TestUser",
        password: "TestUser",
        account: "TestUser",
      });
      const statusActual = response.status;
      expect(statusActual).toBe(200);
    });

    afterEach(async () => {
      const conn = await Client.connect();
      const sql = `DELETE FROM "User" WHERE account = $1`;
      await conn.query(sql, [user.account]);
      conn.release();
    });
  });
});
