const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
require("dotenv").config();

//routes
const authRouter = require("./routes/auth");

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

//routes
fs.readdirSync("./routes").map((r) =>
  app.use(`/api`, require("./routes/" + r))
);

app.listen(PORT, (err) => {
  if (err) return console.error(err);
  console.log(`Server is runnig on port ${PORT} ....`);
});
