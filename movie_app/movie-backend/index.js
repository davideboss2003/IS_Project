// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json()); // parse JSON bodies

// Connect to MongoDB Atlas
mongoose.connect(
  "mongodb+srv://georgeiumunteanu:<pzqcpktyl47yF3Fe>@cluster0.alsjx.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => {
  console.log("Connected to MongoDB Atlas!");
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

// Import routes for reviews
const reviewsRouter = require("./routes/reviews");
app.use("/api/reviews", reviewsRouter);

// Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
