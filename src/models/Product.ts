import Client from "../database";

export type Product = {
  id: Number;
  name: string;
  price: Number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM "Product" ORDER BY id`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async show(id: Number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM "Product" AS product WHERE product.id = ($1)`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async insert(product: Product): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO "Product" (name, price, category) VALUES ($1, $2, $3) RETURNING *`;
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = `UPDATE "Product" 
                    SET name = $1, price = $2, category = $3 
                    WHERE id = $4`;
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
        product.id,
      ]);
      conn.release();
      return product;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async deleteById(id: Number): Promise<Number> {
    try {
      const conn = await Client.connect();
      const sql = `DELETE FROM "Product" AS product WHERE product.id = ($1)`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rowCount;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
