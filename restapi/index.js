require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const productRoute = require("./routes/product");
// const errorMiddleware = require('./middleware/errorMiddleware')
const app = express();
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRoute);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 5000
  err.status = err.status || "error"
  res.status(err.statusCode).json({status: err.statusCode,message:err.message})
});

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`server is at ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
