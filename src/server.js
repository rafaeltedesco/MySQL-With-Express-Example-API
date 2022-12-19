const { app } = require("./app");
const connection = require("./database/connection");

const PORT = 3000;

app.listen(PORT, async () => {
  try {
    await connection.execute("SELECT 1");
    console.log(`Server up and running on port ${PORT}`);
  } catch (err) {
    console.error("Database not connected!");
    process.exit(0);
  }
});
