import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import authRoutes from "./routes/auth.js";
import tripRoutes from "./routes/trips.js";
import itemRoutes from "./routes/items.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/trips", tripRoutes);
app.use("/items", itemRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Travel Packing List API is running!");
});

// Sync database and start server
const PORT = process.env.PORT || 3000;
(async () => {
  try {
    console.log("Before sequelize.sync");
    await sequelize.sync({ force: true });
    console.log("After sequelize.sync");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
