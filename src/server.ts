import express, { Application } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})