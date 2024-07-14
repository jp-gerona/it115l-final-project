import express from "express";
import { dbCredentials, openConnection, closeConnection } from "../db.js";

const router = express.Router();
router.use(express.json());

router.post("/", async (req, res) => {
  const { studentNumber, newPlayerData } = req.body;
  const { newEventID, newStudentNumber, newHouseName } = newPlayerData;
  let connection;

  try {
    connection = await openConnection();
    const result = await connection.execute(
      `UPDATE ${dbCredentials.user}.EVENT_PLAYERS
       SET EVENTID = :newEventID, STUDENTNUMBER = :newStudentNumber, HOUSENAME = :newHouseName
       WHERE STUDENTNUMBER = :studentNumber`,
      [newEventID, newStudentNumber, newHouseName, studentNumber],
      { autoCommit: true }
    );
    console.log("Update result:", result);
  } catch (err) {
    console.error("Database error:", err);
    if (!res.headersSent) {
      // Check if the headers are already sent
      res.status(500).json({ success: false, message: "Server error" });
    }
  } finally {
    await closeConnection(connection);
  }
});

export default router;
