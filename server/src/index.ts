import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;

if(!mongoURI) {
  throw new Error ('MONGO_URI is not defined');
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, ()=> {
    console.log(`Server Running on PORT: ${port}`)
})
