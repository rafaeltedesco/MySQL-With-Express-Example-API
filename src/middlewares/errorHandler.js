const { INTERNAL_SERVER_ERROR } = require("../utils/httpStatus/statusCode");

const handleError = (err, _req, res, _next) => {
  const { status, message } = err;
  return res.status(status || INTERNAL_SERVER_ERROR).json({
    message,
  });
};

module.exports = {
  handleError,
};
