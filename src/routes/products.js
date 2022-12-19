const { Router } = require("express");
const { OK, CREATED, NO_CONTENT } = require("../utils/httpStatus/statusCode");
const { findAll, findOne } = require("../utils/db/dbUtils");

const router = Router();

const TABLENAME = 'products'

router.get("/", async (_req, res) => {
  const products = await findAll(TABLENAME);
  res.status(OK).json(products);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await findOne(TABLENAME, Number(id));

  res.status(OK).json(product);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  res.status(OK).json({
    message: `Product with id ${id} was updated`,
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.status(NO_CONTENT).json();
});

router.post("/", async (req, res) => {
  const data = req.body;

  res.status(CREATED).json({
    message: `Product with id ${1} was created`,
  });
});

module.exports = router;
