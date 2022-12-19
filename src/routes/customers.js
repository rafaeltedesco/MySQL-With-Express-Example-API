const { Router } = require("express");
const {
  OK,
  NO_CONTENT,
  CREATED
} = require("../utils/httpStatus/statusCode");

const router = Router();

router.get("/", async (_req, res) => {
  const customers = [
    { id: 1, name: "Tedesco", email: "tedesco@mail.com", password: 1233 },
  ];
  res.status(OK).json(customers);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const customer = {
    id: 1,
    name: "Tedesco",
    email: "tedesco@mail.com",
    password: 1233,
  };

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
