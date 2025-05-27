
const mongoose = require("mongoose");
console.log("MONGO_URI env var:", process.env.MONGO_URI); // DEBUG ONLY
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGO_URI env var:", process.env.MONGO_URI); 
    // 👇 This will work correctly
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
    console.log("MONGO_URI env var:", process.env.MONGO_URI); 
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
