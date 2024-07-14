import express from "express";
import OracleDB from "oracledb";
import { dbCredentials, openConnection, closeConnection } from "../db.js";

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  let connection;

  try {
    connection = await openConnection();

    const sqlQuery = `
      SELECT EVENTID, HOUSENAME, STUDENTNUMBER
      FROM ${dbCredentials.user}.ATTENDANCE 
      ORDER BY EVENTID ASC`;

      const result = await connection.execute(sqlQuery, [], {
        outFormat: OracleDB.OUT_FORMAT_OBJECT,
    });

    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  } finally {
    await closeConnection(connection);
  }
});

export default router;
