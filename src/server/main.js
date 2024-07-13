import express from "express";
import ViteExpress from "vite-express";
import "dotenv/config";
import { openConnection, closeConnection } from "./db.js";
import LoginRoute from "./routes/loginAuth.js";
import GetMemberListRoute from "./routes/getMemberList.js";
import GetEventListRoute from "./routes/getEventList.js";
import GetPlayerListRoute from "./routes/getPlayerList.js";
import addPlayerRoute from "./routes/addPlayer.js";
import authToken from "./middleware/authToken.js";
import cookieAuth from "./middleware/cookieJWTAuth.js";
import cookieParser from "cookie-parser";
import logout from "./routes/logout.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

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

app.use("/getPlayerList", GetPlayerListRoute);

app.use("/addPlayer", addPlayerRoute);

app.get("/protected", authToken, (req, res) => {
  res.json({ message: "Access to protected data", user: req.user });
});

app.get("/cookieAuth", cookieAuth, (req, res) => {
  // Access user information from req.user
  res.json({ success: true, user: req.user });
});

app.post("/logout", logout);

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
