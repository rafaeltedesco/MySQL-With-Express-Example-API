const connection = require("../../database/connection");

const findAll = async (tablename) => {
  const [result] = await connection.execute(`SELECT * FROM ${tablename}`);
  return result;
};

const findOne = async (tablename, id) => {
  const [result] = await connection.execute(
    `SELECT * FROM ${tablename} WHERE id = ?`,
    [id]
  );
  return result;
};

module.exports = {
  findAll,
  findOne
};
