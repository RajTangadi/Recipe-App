import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
import { UserModel } from "./model/Users.js";
import { recipesRouter } from "./routes/recipes.js";
import path from "path";

dotenv.config();
const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// serving the frontend

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

// mongo connection

const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

connectDb();

app.listen(port, () => console.log(`server listening on ${port}`));
