const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./routes/authRoutes");
const bookRouter = require("./routes/bookRoutes");

const app = express();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/books", bookRouter); 

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

module.exports = app;