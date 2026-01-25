import express from "express";
import cors from "cors";
import healthRoute from "./routes/health.route";
import dotenv from "dotenv";
import {connectDB} from "./database/db"
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api", healthRoute);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
