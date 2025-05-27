require("dotenv").config();
const app = require("./app");
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");


//const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());
const fs = require("fs");
const path = require("path");

// Create /uploads if it doesn't exist
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

app.use("/uploads", express.static("uploads"));
app.use("/api/user", userRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
