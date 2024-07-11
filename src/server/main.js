import express from "express";
import ViteExpress from "vite-express";
import "dotenv/config";
import { openConnection, closeConnection } from "./db.js";
import LoginRoute from "./routes/loginAuth.js";
import GetMemberListRoute from "./routes/getMemberList.js";
import GetEventListRoute from "./routes/getEventList.js";
import authToken from "./middleware/authToken.js";

const app = express();
const port = process.env.PORT || 3000;

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

app.use("/loginAuth", LoginRoute);

app.use("/getMemberList", GetMemberListRoute);

app.use("/getEventList", GetEventListRoute);

app.get("/protected", authToken, (req, res) => {
  res.json({ message: "Access to protected data", user: req.user });
});

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
