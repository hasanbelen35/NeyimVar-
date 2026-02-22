import express from "express";
import cors from "cors";
import routes from "./routes/route";
import dotenv from "dotenv";
import { connectDB } from "./database/db"
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { globalErrorHandler } from "./middlewares/error.middleware";
// dotenv config
dotenv.config();
const app = express();
// helmet
app.use(helmet());
//cors
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser());

//database connection
connectDB();

//routes
app.use("/api", routes);
app.use(globalErrorHandler)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
