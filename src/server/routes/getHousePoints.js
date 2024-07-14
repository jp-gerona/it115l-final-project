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
      `SELECT HOUSENAME, HOUSEPOINTS
       FROM ${dbCredentials.user}.house_Info ORDER BY HOUSEPOINTS DESC`,
      [],
      {
        outFormat: OracleDB.OUT_FORMAT_OBJECT,
      }
    );
    // Ensure the response is in JSON format
    res.json(result.rows); // This should automatically set Content-Type to application/json
    console.log(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Server error" }); // This also sets Content-Type to application/json
    }
  } finally {
    await closeConnection(connection);
  }
});

export default router;
