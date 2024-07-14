import express from "express";
import { dbCredentials, openConnection, closeConnection } from "../db.js";

const router = express.Router();
router.use(express.json());

router.post("/", async (req, res) => {
  const { EVENTID, STUDENTNUMBER, HOUSENAME } = req.body;
  let connection;

  try {
    connection = await openConnection();
    const result = await connection.execute(
      `INSERT INTO ${dbCredentials.user}.ATTENDANCE (EVENTID, STUDENTNUMBER, HOUSENAME) VALUES (:EVENTID, :STUDENTNUMBER, :HOUSENAME)`,
      [EVENTID, STUDENTNUMBER, HOUSENAME],
      { autoCommit: true }
    );
    console.log("Add result:", result);
    res.json(result.rows);
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
