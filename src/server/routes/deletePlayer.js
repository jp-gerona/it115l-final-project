import express from "express";
import { dbCredentials, openConnection, closeConnection } from "../db.js";

const router = express.Router();
router.use(express.json());

router.delete("/", async (req, res) => {
  const { studentNumber } = req.body;
  let connection;

  try {
    connection = await openConnection();
    const result = await connection.execute(
      `DELETE FROM ${dbCredentials.user}.EVENT_PLAYERS WHERE STUDENTNUMBER = :studentNumber`,
      [studentNumber],
      { autoCommit: true }
    );
    console.log("Delete result:", result);
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
