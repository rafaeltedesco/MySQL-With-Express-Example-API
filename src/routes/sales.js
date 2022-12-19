const { Router } = require("express");
const { OK, NO_CONTENT, CREATED } = require("../utils/httpStatus/statusCode");
const {
  findAll,
  findOne,
  update,
  create,
  deleteOne,
} = require("../utils/db/dbUtils");
const { handleRouteAsync } = require("../helpers/handlers/asyncHandler");

const router = Router();

const TABLENAME = "sales";

router.get("/", async (_req, res) => {
  const sales = await findAll(
    TABLENAME,
    [
      "sales.quantity",
      "customers.name",
      "customers.email",
      "products.name",
      "products.price",
      "products.stock",
    ],
    `INNER JOIN store.customers
  ON customers.id = sales.customer_id
  INNER JOIN store.products
  ON products.id = sales.product_id`
  );
  res.status(OK).json(sales);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const sale = await findOne(
    TABLENAME,
    Number(id),
    [
      "sales.quantity",
      "customers.name",
      "customers.email",
      "products.name",
      "products.price",
      "products.stock",
    ],
    `INNER JOIN store.customers
  ON customers.id = sales.customer_id
  INNER JOIN store.products
  ON products.id = sales.product_id`
  );

  res.status(OK).json(sale);
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
    message: `Sale with id ${id} was updated`,
  });
});

router.delete(
  "/:id",
  handleRouteAsync(async (req, res) => {
    const { id } = req.params;
    await deleteOne(TABLENAME, Number(id));
    res.status(NO_CONTENT).json();
  })
);

router.post("/", async (req, res) => {
  const data = req.body;
  const { insertId } = await create(TABLENAME, data);
  res.status(CREATED).json({
    message: `Sale with id ${insertId} was created`,
  });
});

module.exports = router;
