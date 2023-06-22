import { Pool } from "pg";
import Client from "../database";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

const saltRounds = process.env.SALT_ROUNDS
  ? parseInt(process.env.SALT_ROUNDS)
  : 10;

const pepper = "ABCD#12";

export type User = {
  id: Number;
  fristname: string;
  lastname: string;
  password: string;
  account: string;
};

export class UserStore {
  async login(account: string, password: string): Promise<boolean> {
    try {
      const passwordCheck = await this.getPass(account);
      return bcrypt.compareSync(password + pepper, passwordCheck);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async insert(user: User): Promise<number> {
    try {
      let checkUser = await this.getByAccount(user.account);

      if (checkUser.account != "") {
        return -1;
      } else {
        const hash = bcrypt.hashSync(user.password + pepper, saltRounds);
        return 0;
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
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

  async getByAccount(account: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM "User" AS u WHERE u.account = ($1)`;
      const result = await conn.query(sql, [account]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get users. Error: ${error}`);
    }
  }

  async getPass(account: string): Promise<string> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT u.password FROM "User" AS u WHERE u.account = ($1)`;
      const result = await conn.query(sql, [account]);

      let u = this.getByAccount(account);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get users. Error: ${error}`);
    }
  }
}
