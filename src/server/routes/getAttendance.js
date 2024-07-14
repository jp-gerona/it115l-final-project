import express from "express";
import OracleDB from "oracledb";
import { dbCredentials, openConnection, closeConnection } from "../db.js";

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  let connection;
  const eventID = req.query.eventID;

  try {
    connection = await openConnection();
    const result = await connection.execute(
      `SELECT a.STUDENTNUMBER, EVENTNAME, STUDENTFIRSTNAME || ' ' || STUDENTLASTNAME AS PLAYERNAME, a.HOUSENAME, STUDENTYEAR
       FROM ${dbCredentials.user}.Attendance a
       INNER JOIN ${dbCredentials.user}.EVENT_LIST el ON a.EVENTID = el.EVENTID
       INNER JOIN ${dbCredentials.user}.STUDENT_INFO s ON a.STUDENTNUMBER = s.STUDENTNUMBER
       WHERE a.EVENTID = :eventID 
       ORDER BY a.STUDENTNUMBER ASC`,
      [eventID],
      {
        outFormat: OracleDB.OUT_FORMAT_OBJECT,
      }
    );

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
