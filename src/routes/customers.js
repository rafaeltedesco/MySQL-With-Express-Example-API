const { Router } = require("express");
const { OK, NO_CONTENT, CREATED } = require("../utils/httpStatus/statusCode");
const { findAll, findOne } = require("../utils/db/dbUtils");

const router = Router();

const TABLENAME = "customers";

router.get("/", async (_req, res) => {
  const customers = await findAll(TABLENAME);
  res.status(OK).json(customers);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const customer = await findOne(TABLENAME, Number(id));

  res.status(OK).json(customer);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  res.status(OK).json({
    message: `Customer with id ${id} was updated`,
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.status(NO_CONTENT).json();
});

router.post("/", async (req, res) => {
  const data = req.body;
  const { insertId } = 1;
  res.status(CREATED).json({
    message: `Customer with id ${insertId} was created`,
  });
});

module.exports = router;
