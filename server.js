import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cors from "cors";
import { connectDB } from "./config/database.js";

config({
  path: "./config/config.env",
});

const app = express();

connectDB();

// Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    // credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Route Imports
import userRoute from "./routes/userRoutes.js";

app.use("/api/users", userRoute);

// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.use(ErrorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
