import express from "express";
import OracleDB from "oracledb";
import { dbCredentials, openConnection, closeConnection } from "../db.js";

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  let connection;

  try {
    connection = await openConnection();

    const result = await connection.execute(
      `SELECT STUDENTNUMBER, STUDENTFIRSTNAME || ' ' || STUDENTLASTNAME AS STUDENTNAME, HOUSENAME, STUDENTYEAR, STUDENTPROGRAM FROM ${dbCredentials.user}.STUDENT_INFO ORDER BY STUDENTNUMBER ASC`,
      [],
      {
        outFormat: OracleDB.OUT_FORMAT_OBJECT,
      }
    );
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
