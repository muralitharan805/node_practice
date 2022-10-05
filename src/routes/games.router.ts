// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../model/user";
import { Response_Body } from "src/model/response";
// Global Config
export const userRouter = express.Router();

userRouter.use(express.json());
// GET
userRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await collections.user?.find({}).toArray();
    if (users) {
      const res_msg: Response_Body = {
        status: false,
        result: [],
      };
    }
    const res_msg: Response_Body = {
      status: true,
      result: users as Array<any>,
    };
    res.status(200).send(res_msg);
  } catch (error) {
    res.status(500).send(error);
  }
});
// POST
userRouter.post("/exists", async (_req: Request, res: Response) => {
  try {
    const newGame = _req.body as User;

    if (newGame.phone != null) {
      console.log("checkk true");

      //   console.log("checkk true", newGame.phone as unknown as number);
      //   const chnge: number = _req.body.phone as unknown as number;
      newGame["phone"] = Number(newGame.phone);
    }

    console.log("checkk true", newGame);

    const users = await collections.user?.find({ ...newGame }).toArray();

    let res_msg: Response_Body = {
      status: true,
      result: users as Array<any>,
    };
    if (users) {
      console.log(users?.length < 0);

      if (users.length == 0) {
        res_msg = {
          status: false,
          result: [],
        };
      }
    }

    res.status(200).send(res_msg);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newGame = req.body as User;
    const result = await collections.user?.insertOne(newGame);
    const res_msg: Response_Body = {
      status: true,
      result: { id: result?.insertedId },
    };
    const res_msg_err: Response_Body = {
      status: false,
      result: [],
    };
    result ? res.status(201).send(res_msg) : res.status(500).send(res_msg_err);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
// PUT

// DELETE
