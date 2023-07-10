import supertest from "supertest";
import Client from "../../database";
import app from "../../server";
import { User, UserStore } from "../../models/User";
import dotenv from "dotenv";

const request = supertest(app);

const userStore = new UserStore();

describe("Test api order ", () => {
  const user: User = {
    id: 0,
    firstname: "TestOrder",
    lastname: "TestOrder",
    password: "TestOrder",
    account: "TestOrder",
  };

  describe("Test api get order by user ", () => {
    beforeEach(async () => {
      await userStore.insert(user);
    });
    it("Order by user", async () => {
      const login = await request.post("/login").send({
        account: user.account,
        password: user.password,
      });
      const token = login.body.token;
      const response = await request
        .get("/order/1")
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
