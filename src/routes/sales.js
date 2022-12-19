const { Router } = require("express");
const { OK, NO_CONTENT, CREATED } = require("../utils/httpStatus/statusCode");
const { findAll, findOne } = require("../utils/db/dbUtils");

const router = Router();

const TABLENAME = 'sales'

router.get("/", async (_req, res) => {
  const sales = await findAll(TABLENAME);
  res.status(OK).json(sales);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const sale = await findOne(TABLENAME, Number(id))

  res.status(OK).json(sale);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  res.status(OK).json({
    message: `Sale with id ${id} was updated`,
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.status(NO_CONTENT).json();
});

router.post("/", async (req, res) => {
  const data = req.body;

  res.status(CREATED).json({
    message: `Sale with id ${1} was created`,
  });
});

module.exports = router;
