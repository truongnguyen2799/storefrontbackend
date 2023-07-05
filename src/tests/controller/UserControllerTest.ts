import supertest from "supertest";
import Client from "../../database";
import app from "../../server";
import { User, UserStore } from "../../models/User";

const request = supertest(app);
const userStore = new UserStore();

describe("Test api", () => {
  const user: User = {
    id: 0,
    fristname: "Test",
    lastname: "Test",
    password: "12345",
    account: "123qwe",
  };

  describe("Test api insert user ", () => {
    var url = "/user/insert";
    var dataObj = JSON.stringify(user);
    console.log(
      "🚀 ~ file: UserControllerTest.ts:21 ~ describe ~ dataObj:",
      dataObj
    );
    it("Register", async () => {
      const response = await request.post(url).send({
        id: 0,
        fristname: "Test",
        lastname: "Test",
        password: "12345",
        account: "123qwe",
      });
      expect(response.status).toBe(200);
      expect(response.body).toBe("Success");
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

  describe("Test api login", () => {
    beforeEach(async () => {
      userStore.insert(user);
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

  describe("Test api with token", () => {
    beforeEach(async () => {
      userStore.insert(user);
    });
    it("Have token", async () => {
      const login = await request.post("/login").send({
        account: user.account,
        password: user.password,
      });
      const token = login.body.token;
      console.log("🚀 ~ file: UserControllerTest.ts:82 ~ it ~ token:", token);

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
});
