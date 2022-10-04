// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Game from "../model/user";
// Global Config
export const gamesRouter = express.Router();

gamesRouter.use(express.json());
// GET
gamesRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const games = await collections.games?.find({}).toArray();

    res.status(200).send(games);
  } catch (error) {
    res.status(500).send(error);
  }
});
// POST
gamesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newGame = req.body as Game;
    const result = await collections.games?.insertOne(newGame);

    result
      ? res
          .status(201)
          .send(`Successfully created a new game with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new game.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
// PUT

// DELETE
