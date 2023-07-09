import Client from "../../database";
import { Order, OrderStore } from "../../models/Order";

const orderStore = new OrderStore();

describe("Tests for function in Order", () => {
  describe("Test function getByUser", () => {
    beforeEach(async () => {
      try {
        const conn = await Client.connect();
        const sql = `INSERT INTO "Orders" (user_id, status_of_order) VALUES ('100', '0'), ('100','1')`;
        await conn.query(sql, []);
        conn.release();
      } catch (error) {
      }
    });
    it("getByUser", async () => {
      const actual = await orderStore.getByUser(100);
      expect(actual.length).toBe(1);
    });
    afterEach(async () => {
      const conn = await Client.connect();
      const sql = `DELETE FROM "Orders" WHERE user_id = 100`;
      const result = await conn.query(sql, []);
      conn.release();
    });
  });

  describe("Test function getListProduct", () => {
    var productId = 0;
    var orderId = 0;
    beforeEach(async () => {
      try {
        const conn = await Client.connect();
        const sql = `INSERT INTO "Orders" (user_id, status_of_order) VALUES ('100', '0') RETURNING *`;
        const resultO = await conn.query(sql, []);
        orderId = resultO.rows[0].id;

        const sqlP = `INSERT INTO "Product" (name, price, category) VALUES ('test1', 10, 'cate1')RETURNING *`;
        const resultP = await conn.query(sqlP, []);
        productId = resultP.rows[0].id;

        const sqlOP = `INSERT INTO "Order_Product" (order_id, product_id, quantity) VALUES ($1, $2, 10)`;
        await conn.query(sqlOP, [orderId, productId]);

        conn.release();
      } catch (error) {
        console.log("🚀 ~ file: OrderTest.ts:15 ~ beforeEach ~ error:", error);
      }
    });
    it("getListProduct", async () => {
      const actual = await orderStore.getListProduct(orderId);
      expect(actual.length).toBe(1);
    });
    afterEach(async () => {
      const conn = await Client.connect();

      const sqlOP = `DELETE FROM "Order_Product" WHERE order_id = $1 AND product_id = $2`;
      await conn.query(sqlOP, [orderId, productId]);

      const sqlO = `DELETE FROM "Orders" WHERE user_id = 100`;
      await conn.query(sqlO, []);

      const sqlP = `DELETE FROM "Product" WHERE id = $1`;
      await conn.query(sqlP, [productId]);

      conn.release();
    });
  });
});
