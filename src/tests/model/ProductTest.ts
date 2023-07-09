import Client from "../../database";
import { Product, ProductStore } from "../../models/Product";

const productStore = new ProductStore();

describe("Tests for function in Product", () => {
  var id: Number = 0;
  describe("test function index", () => {
    var expectRs = 0;
    beforeEach(async () => {
      try {
        const conn = await Client.connect();
        const sql = `SELECT * FROM "Product"`;
        const result = await conn.query(sql, []);
        expectRs = result.rowCount;
        conn.release();
      } catch (error) {}
    });
    it("index product", async () => {
      const products = await productStore.index();
      const length = products.length;
      expect(length).toBe(expectRs);
    });
    afterEach;
  });

  describe("test function show", () => {
    id = 0;
    beforeEach(async () => {
      try {
        const conn = await Client.connect();
        console.log("🚀 ~ file: ProductTest.ts:32 ~ beforeEach ~ Client:", Client)
        const sql = `INSERT INTO "Product" (name, price, category) VALUES ('test1', 10, 'cate1')RETURNING *`;
        const result = await conn.query(sql, []);
        id = result.rows[0].id;
        conn.release();
      } catch (error) {}
    });
    it("Show  product", async () => {
      const product = await productStore.show(id);
      const name = product.name;
      expect(name).toBe("test1");
    });
    afterEach(async () => {
      await productStore.deleteById(id);
    });
  });

  describe("test function insert", () => {
    id = 0;
    it("Insert product", async () => {
      const product: Product = {
        id: 1,
        name: "test1",
        price: 12,
        category: "",
      };

      const result = await productStore.insert(product);
      id = result[0].id;
      const actual = await productStore.show(id);
      expect(actual.name).toBe(product.name);
    });
    afterEach(async () => {
      await productStore.deleteById(id);
    });
  });

  describe("test function update", () => {
    id = 0;
    beforeEach(async () => {
      try {
        const conn = await Client.connect();
        const sql = `INSERT INTO "Product" (name, price, category) VALUES ('test1', 10, 'cate1')RETURNING *`;
        const result = await conn.query(sql, []);
        id = result.rows[0].id;
        conn.release();
      } catch (error) {}
    });
    it("Update product", async () => {
      const product: Product = {
        id: id,
        name: "testupdate",
        price: 12,
        category: "",
      };
      await productStore.update(product);
      const actual = await productStore.show(id);
      expect(actual.name).toBe(product.name);
    });
    afterEach(async () => {
      await productStore.deleteById(id);
    });
  });

  describe("test function show", () => {
    id = 0;
    beforeEach(async () => {
      try {
        const conn = await Client.connect();
        const sql = `INSERT INTO "Product" (name, price, category) VALUES ('test1', 10, 'cate1')RETURNING *`;
        const result = await conn.query(sql, []);
        id = result.rows[0].id;
        conn.release();
      } catch (error) {}
    });
    it("Delete product", async () => {
      const actual = await productStore.deleteById(id);
      expect(actual).toBe(1);
    });
  });
});
