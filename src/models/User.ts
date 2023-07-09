import { Pool } from "pg";
import Client from "../database";
import bcrypt from "bcrypt";

const saltRounds = process.env.SALT_ROUNDS
  ? parseInt(process.env.SALT_ROUNDS)
  : 10;

const pepper = "ABCD#12";

export type User = {
  id: Number;
  firstname: string;
  lastname: string;
  password: string;
  account: string;
};

export class UserStore {
  async login(account: string, password: string): Promise<boolean> {
    let check = false;
    try {
      if (account == "" || password == "") {
        return check;
      }

      let userCheck = await this.getByAccount(account);

      if (userCheck == null || userCheck.account == "") {
        return check;
      }

      let passwordCheck = userCheck.password;

      if (bcrypt.compareSync(password + pepper, passwordCheck)) {
        check = true;
      }
      return check;
    } catch (error) {
      return false;
    }
  }

  async insert(user: User): Promise<number> {
    try {
      let checkUser = await this.getByAccount(user.account);
      if (checkUser != null && checkUser.account != "") {
        return -1;
      } else {
        const hash = bcrypt.hashSync(user.password + pepper, saltRounds);
        const conn = await Client.connect();
        const sql = `INSERT INTO "User" (firstname, lastname, account, password) VALUES ($1, $2, $3, $4)`;
        await conn.query(sql, [
          user.firstname,
          user.lastname,
          user.account,
          hash
        ]);
        conn.release();
        return 0;
      }
    } catch (error) {
      console.log("🚀 ~ file: User.ts:64 ~ UserStore ~ insert ~ error:", error);
      throw new Error(`Error: ${error}`);
    }
  }

  async getByAccount(account: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM "User" AS u WHERE u.account = ($1)`;
      const result = await conn.query(sql, [account]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get users. Error: ${error}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM "User"`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get user. Error: ${error}`);
    }
  }

  async getById(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM "User" AS u WHERE u.id = ($1)`;
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get users. Error: ${error}`);
    }
  }
}
