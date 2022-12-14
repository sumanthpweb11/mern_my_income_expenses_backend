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
    origin: ["http://localhost:3000", "https://mern-myexpense.onrender.com"],
    // credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Route Imports
import userRoute from "./routes/userRoutes.js";
import transactionRoute from "./routes/transactionRoutes.js";

app.use("/api/users", userRoute);
app.use("/api/transactions", transactionRoute);

app.get("/", (req, res) =>
  res.send(
    `<h1>Server is working click <a href=${process.env.FRONTEND_URL}>here</a></h1>`
  )
);

app.use(ErrorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
