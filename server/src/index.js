const express = require("express");
const { connectDB } = require("./db");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
