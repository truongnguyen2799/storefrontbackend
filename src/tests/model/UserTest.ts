import Client from "../../database";
import { User, UserStore } from "../../models/User";

const userStore = new UserStore();

const user: User = {
  id: 0,
  firstname: "TestLogin",
  lastname: "TestLogin",
  password: "TestLogin",
  account: "TestLogin",
};

describe("Tests for function in User", () => {
  describe("Test function login", () => {
    beforeEach(async () => {
      await userStore.insert(user);
    });
    it("login", async () => {
      const actual = await userStore.login(user.account, user.password);

      expect(actual).toBe(true);
    });

    afterEach(async () => {
      const conn = await Client.connect();
      const sql = `DELETE FROM "User" WHERE account = ($1)`;
      await conn.query(sql, [user.account]);
    });
  });

  describe("Test function insert", () => {
    it("insert user", async () => {
      const result = await userStore.insert(user);
      expect(result).toBe(0);
    });

    afterEach(async () => {
      const conn = await Client.connect();
      const sql = `DELETE FROM "User" WHERE account = ($1)`;
      await conn.query(sql, [user.account]);
    });
  });

  describe("test function getByAccount", () => {
    beforeEach(async () => {
      await userStore.insert(user);
    });
    it("getByAccount", async () => {
      const userActual = await userStore.getByAccount(user.account);
      const fristnameActual: String = userActual.firstname;
      expect(fristnameActual).toBe(user.firstname);
    });
    afterEach(async () => {
      const conn = await Client.connect();
      const sql = `DELETE FROM "User" WHERE account = ($1)`;
      await conn.query(sql, [user.account]);
    });
  });

  describe("test function index", () => {
    var expectRs = 0;
    beforeEach(async () => {
      try {
        const conn = await Client.connect();
        const sql = `SELECT * FROM "User"`;
        const result = await conn.query(sql, []);
        expectRs = result.rowCount;
        conn.release();
      } catch (error) {}
    });
    it("index product", async () => {
      const products = await userStore.index();
      const length = products.length;
      expect(length).toBe(expectRs);
    });
  });

  describe("test function getById", () => {
    var id = 0;
    beforeEach(async () => {
      try {
        const conn = await Client.connect();
        const sql = `INSERT INTO "User" (firstname, lastname, account, password) VALUES ($1, $2, $3, $4)RETURNING *`;
        const result = await conn.query(sql, [
          user.firstname,
          user.lastname,
          user.account,
          user.password,
        ]);
        id = result.rows[0].id;
        conn.release();
      } catch (error) {}
    });
    it("getById user", async () => {
      const actual = await userStore.getById(id);
      expect(actual.account).toBe(user.account);
    });
    afterEach(async () => {
      const conn = await Client.connect();
      const sql = `DELETE FROM "User" WHERE account = ($1)`;
      await conn.query(sql, [user.account]);
    });
  });
});
