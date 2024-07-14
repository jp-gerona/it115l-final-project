import express from "express";
import ViteExpress from "vite-express";
import "dotenv/config";
import { openConnection, closeConnection } from "./db.js";
import LoginRoute from "./routes/loginAuth.js";
import AddAttendanceRoute from "./routes/addAttendance.js";
import GetAttendanceRoute from "./routes/getAttendance.js";
import EditAttendanceRoute from "./routes/editAttendance.js";
import DeleteAttendanceRoute from "./routes/deleteAttendance.js";
import GetMemberListRoute from "./routes/getMemberList.js";
import GetEventListRoute from "./routes/getEventList.js";
import addPlayerRoute from "./routes/addPlayer.js";
import GetPlayerListRoute from "./routes/getPlayerList.js";
import editPlayerRoute from "./routes/editPlayer.js";
import deletePlayerRoute from "./routes/deletePlayer.js";
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

// Attendance
app.use("/addAttendance", AddAttendanceRoute);
app.use("/getAttendance", GetAttendanceRoute);
app.use("/editAttendance", EditAttendanceRoute);
app.use("/deleteAttendance", DeleteAttendanceRoute);

// Members
app.use("/getMemberList", GetMemberListRoute);

// Events
app.use("/getEventList", GetEventListRoute);

// Players
app.use("/addPlayer", addPlayerRoute);
app.use("/getPlayerList", GetPlayerListRoute);
app.use("/deletePlayer", deletePlayerRoute);
app.use("/editPlayer", editPlayerRoute);

// Authorization
app.get("/protected", authToken, (req, res) => {
  res.json({ message: "Access to protected data", user: req.user });
});
app.get("/cookieAuth", cookieAuth, (req, res) => {
  // Access user information from req.user
  res.json({ success: true, user: req.user });
});

// Logout
app.post("/logout", logout);

// Port Used
ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
