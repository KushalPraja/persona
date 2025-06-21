const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

// Mongoose connection options
const options = {
  // Set server API version for compatibility
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

// Connect to MongoDB using Mongoose
async function connectDB() {
  try {
    await mongoose.connect(uri, options);
    console.log("✅ Successfully connected to MongoDB with Mongoose!");

    // Test the connection
    await mongoose.connection.db.admin().ping();
    console.log("✅ Database ping successful!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

// Graceful shutdown
async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error disconnecting from MongoDB:", error);
  }
}

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("🔗 Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("🔌 Mongoose disconnected from MongoDB");
});

// Handle process termination
process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});

module.exports = { connectDB, disconnectDB };
