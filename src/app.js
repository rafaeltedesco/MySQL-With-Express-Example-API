require("dotenv").config();
const express = require("express");
const { handleError } = require("./middlewares/errorHandler");

const welcomeRouter = require("./routes/welcome");
const customerRouter = require("./routes/customers");
const productsRouter = require("./routes/products");
const salesRouter = require("./routes/sales");

const app = express();

app.use(express.json());

app.get("/", welcomeRouter);

app.use("/customers", customerRouter);
app.use("/products", productsRouter);
app.use("/sales", salesRouter);
app.use(handleError);

module.exports = {
  app,
};
