import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config({path: '.env.local'});

const app: Express = express();
const port = Number(process.env.PORT) || 3001;

app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI as string;

if(!mongoURI) {
  throw new Error ('MONGO_URI is not defined');
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use(express.static(path.join(__dirname, '../../client/dist')));  

app.use("/api/financial-records", financialRecordRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});

app.listen(port, '0.0.0.0', ()=>{console.log(`Server Running on PORT: ${port}`)})
