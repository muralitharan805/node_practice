import express from "express";
import { Request, Response } from "express";

import { connectToDatabase } from "./services/database.service";
import { userRouter } from "./routes/games.router";
import * as dotenv from "dotenv";
dotenv.config();
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));

app.use(
  ("/" + process.env.USER_FILE_FOLDER) as string,
  express.static(process.env.USER_FILE_FOLDER as string)
);

connectToDatabase()
  .then(() => {
    app.use("/user", userRouter);
    const port = 4201;
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
