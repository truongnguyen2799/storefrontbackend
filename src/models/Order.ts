import Client from "../database";

export type Order = {
  id: Number;
  user_id: string;
  status_of_order: string;
  listProduct: OrderProduct[];
};

export type OrderProduct = {
  id: Number;
  name: string;
  price: Number;
  category: string;
  quantity: Number;
};

export class OrderStore {
  async getByUser(idUser: Number): Promise<Order[]> {
    try {
      let orders: Order[];
      const conn = await Client.connect();

      //get order
      const sql = `SELECT * FROM "Orders" AS o WHERE o.user_id = ($1) AND o.status_of_order = '0'`;
      const result = await conn.query(sql, [idUser]);
      conn.release();
      orders = result.rows;

      for (var i = 0; i < orders.length; i++) {
        const listP = await this.getListProduct(orders[i].id);
        orders[i].listProduct = listP;
      }

      return orders;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async getListProduct(orderId: Number): Promise<OrderProduct[]> {
    const conn = await Client.connect();
    const sql = `SELECT
                      p.id,
                      p.name,
                      p.price,
                      p.category,
                      op.quantity
                    FROM "Order_Product" AS op 
                    INNER JOIN "Product" AS p ON op.product_id = p.id
                    WHERE op.order_id= ($1)`;
    const result = await conn.query(sql, [orderId]);
    conn.release();
    return result.rows;
  }
}
