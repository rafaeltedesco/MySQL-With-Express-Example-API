const { Router } = require("express");
const { OK, CREATED, NO_CONTENT } = require("../utils/httpStatus/statusCode");
const {
  findAll,
  findOne,
  update,
  create,
  deleteOne,
} = require("../utils/db/dbUtils");
const { handleRouteAsync } = require("../helpers/handlers/asyncHandler");

const router = Router();

const TABLENAME = "products";

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

  const { affectedRows } = await update(TABLENAME, data, Number(id));
  if (affectedRows === 0) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL SERVER ERROR",
    });
  }
  res.status(OK).json({
    message: `Product with id ${id} was updated`,
  });
});

router.delete("/:id", handleRouteAsync( async (req, res) => {
  const { id } = req.params;
  await deleteOne(TABLENAME, Number(id));
  res.status(NO_CONTENT).json();
}));

router.post("/", async (req, res) => {
  const data = req.body;
  const { insertId } = await create(TABLENAME, data);

  res.status(CREATED).json({
    message: `Product with id ${insertId} was created`,
  });
});

module.exports = router;
