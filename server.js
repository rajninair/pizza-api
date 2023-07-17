const express = require("express");
const mongoose = require("mongoose");

const { APP_PORT, DB_URL } = require("./config");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// DB connection
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the Express server
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded());

// Middleware - Error handlers
app.use(errorHandler);

app.use("/api", routes);

app.listen(APP_PORT, () => {
  console.log(`app listening on port ${APP_PORT}!`);
});
