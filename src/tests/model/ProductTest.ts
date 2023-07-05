import Client from "../databasetest";
import { Product, ProductStore } from "../../models/Product";

const productStore = new ProductStore();

describe("Tests for function in Product", () => {
  describe("test function index", () => {
    beforeEach(async () => {
      try {
        const conn = await Client.connect();
        const sql = `INSERT INTO "Product" (name, price, category) VALUES ('name1', 10, 'cate1'), ('name2', 10, 'cate1') RETURNING *`;
        const result = await conn.query(sql, []);
        conn.release();
      } catch (error) {
        console.log(
          "🚀 ~ file: ProductTest.ts:20 ~ beforeEach ~ error:",
          error
        );
      }
    });

    it("index", async () => {
      const products = await productStore.index;
      const length = products.length;
      expect(length).toBe(2);
    });

    afterEach(async () => {
      try {
        const conn = await Client.connect();
        const sql = `DELETE FROM "Product" AS product)`;
        await conn.query(sql, []);
        conn.release();
      } catch (error) {
        console.log("🚀 ~ file: ProductTest.ts:40 ~ afterEach ~ error:", error);
      }
    });
  });

  describe("test function show", () => {
    var id = 1;
    beforeEach(async () => {
      try {
        const conn = await Client.connect();
        const sql = `INSERT INTO "Product" (name, price, category) VALUES ('name1', 10, 'cate1')RETURNING *`;
        const result = await conn.query(sql, []);
        const id = result.rows[0].id;
        conn.release();
      } catch (error) {
        console.log(
          "🚀 ~ file: ProductTest.ts:20 ~ beforeEach ~ error:",
          error
        );
      }
    });

    it("Show", async () => {
      const product = await productStore.show(id);
      const name = product.name;
      expect(name).toBe("name1");
    });

    afterEach(async () => {
      try {
        const conn = await Client.connect();
        const sql = `DELETE FROM "Product" AS product)`;
        await conn.query(sql, []);
        conn.release();
      } catch (error) {
        console.log("🚀 ~ file: ProductTest.ts:40 ~ afterEach ~ error:", error);
      }
    });
  });

  afterAll(() => {});
});
