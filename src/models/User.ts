import Client from "../database";
import express, { Request, Response } from "express";

export type User = {
  id: Number;
  fristname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM "User"`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get books. Error: ${error}`);
    }
  }
}
