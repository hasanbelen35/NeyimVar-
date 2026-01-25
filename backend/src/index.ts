import express from "express";
import cors from "cors";
import routes from "./routes/route";
import dotenv from "dotenv";
import {connectDB} from "./database/db"
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api", routes);
app.use(cookieParser());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
