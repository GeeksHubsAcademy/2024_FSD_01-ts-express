import express, { Application } from "express";
import dotenv from "dotenv";
import { getRoles } from "./controllers/roleController";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 4001;

app.get('/healthy', (req, res) => {
  res.status(200).json(
    {
      success: true,
      message: "Server is healthy"
    }
  );
})

// roles routes
app.get('/roles', getRoles)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})