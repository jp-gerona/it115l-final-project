import express from "express";
import OracleDB from "oracledb";
import { dbCredentials, openConnection, closeConnection } from "../db.js";

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  let connection;
  const selectedDay = "Day " + req.query.day;

  try {
    connection = await openConnection();

    const sqlQuery = `
      SELECT el.EVENTID, EVENTNAME, EVENTTIMESTART, EVENTTIMEEND, EVENTVENUE 
      FROM ${dbCredentials.user}.EVENT_LIST el
      INNER JOIN ${dbCredentials.user}.EVENT_SCHEDULE es ON el.EVENTID = es.EVENTID
      WHERE EVENTDAY = :selectedDay
      ORDER BY el.EVENTID ASC`;

    const result = await connection.execute(sqlQuery, [selectedDay], {
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
