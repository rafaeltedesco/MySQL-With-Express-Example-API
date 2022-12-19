const { Router } = require("express");
const {
  OK,
  NO_CONTENT,
  CREATED,
  INTERNAL_SERVER_ERROR,
} = require("../utils/httpStatus/statusCode");
const {
  findAll,
  findOne,
  update,
  create,
  deleteOne,
} = require("../utils/db/dbUtils");
const { handleRouteAsync } = require("../helpers/handlers/asyncHandler");

const router = Router();

const TABLENAME = "customers";

router.get("/", async (_req, res) => {
  const customers = await findAll(TABLENAME, ['name', 'email']);
  res.status(OK).json(customers);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const customer = await findOne(TABLENAME, Number(id), ['name', 'email']);

  res.status(OK).json(customer);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { affectedRows } = await update(TABLENAME, data, Number(id));
  if (affectedRows === 0) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL SERVER ERROR",
    });
  }
  res.status(OK).json({
    message: `Customer with id ${id} was updated`,
  });
});

router.delete("/:id", handleRouteAsync(async (req, res) => {
  const { id } = req.params;
  await deleteOne(TABLENAME, Number(id));
  res.status(NO_CONTENT).json();
}));

router.post("/", async (req, res) => {
  const data = req.body;
  const { insertId } = await create(TABLENAME, data);
  res.status(CREATED).json({
    message: `Customer with id ${insertId} was created`,
  });
});

module.exports = router;
