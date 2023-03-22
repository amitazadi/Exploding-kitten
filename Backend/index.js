const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://khurjapinki:Pinki123@cluster0.fehi05w.mongodb.net/?retryWrites=true&w=majority"
);

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
  console.log("Server is working on port 8000");
});
