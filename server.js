const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("DATABASE CONNECTED....."))
  .catch((err) => console.error(`CONNECTION ERROR: ${err}`));

//middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ data: "hello" });
});

app.listen(PORT, (err) => {
  if (err) return console.error(err);
  console.log(`Server is runnig on port ${PORT} ....`);
});
