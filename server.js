import express from "express";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

//MongoDB Connection
connectDB();
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/inventory", inventoryRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode On Port ${process.env.PORT}`
      .bgBlue.white
  );
});
