import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
import { UserModel } from "./model/Users.js";
import { recipesRouter } from "./routes/recipes.js";

dotenv.config();
const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

app.listen(port, () => console.log(`server listening on ${port}`));

// mongo connection

const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

connectDb();
