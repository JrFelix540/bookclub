import { Response } from "express";

export interface MyContext {
  res: Response;
  token: string;
}
