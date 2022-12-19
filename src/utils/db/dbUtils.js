const connection = require("../../database/connection");

const findAll = async (tablename, columns = null, join=null) => {
  let queryColumns = null;
  if (columns) {
    queryColumns = columns.join(",");
  }
  const [result] = await connection.execute(
    `SELECT ${queryColumns || "*"} FROM ${tablename}
    ${join || ''}`
  );
  return result;
};

const findOne = async (tablename, id, columns = null, join=null) => {
  let queryColumns = null;
  if (columns) {
    queryColumns = columns.join(",");
  }
  const [result] = await connection.execute(
    `SELECT ${queryColumns || '*'} FROM ${tablename} 
    ${join || ''}
    WHERE ${tablename}.id = ?`,
    [id]
  );
  return result;
};

const update = async (tablename, content, id) => {
  const columns = Object.keys(content)
    .map((column) => `${column} = ?`)
    .join(",");
  const values = Object.values(content);
  const [result] = await connection.execute(
    `
    UPDATE ${tablename}
    SET ${columns}
    WHERE id = ?`,
    [...values, id]
  );
  return result;
};

const create = async (tablename, content) => {
  const columns = Object.keys(content)
    .map((column) => `${column}`)
    .join(",");
  const values = Object.values(content);
  const placeholders = Array(3).fill("?");
  const [result] = await connection.execute(
    `INSERT INTO ${tablename} (${columns})
        VALUES (${placeholders})`,
    [...values]
  );
  return result;
};

const deleteOne = async (tablename, id) => {
  const [result] = await connection.execute(
    `DELETE FROM ${tablename}
        WHERE id = ?`,
    [id]
  );
  return result;
};

module.exports = {
  findAll,
  findOne,
  update,
  create,
  deleteOne,
};
