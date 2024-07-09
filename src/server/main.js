import express from "express";
import ViteExpress from "vite-express";
import { openConnection, closeConnection } from "./db.js";

const app = express();
const port = 3000;

app.get("/hello", async (req, res) => {
  let connection;
  try {
    connection = await openConnection();
    res.send("Hello Vite + React!");
  } catch (err) {
    res.status(500).send("Failed to connect to the database");
  } finally {
    await closeConnection(connection);
  }
});

import LoginRoute from "./routes/loginAuth.js";
app.use("/loginAuth", LoginRoute);

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
