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
      `SELECT EVENTNAME, STUDENTLASTNAME || ' ' || STUDENTFIRSTNAME AS PLAYERNAME, ep.HOUSENAME, STUDENTYEAR
       FROM C##ALCANTARA.EVENT_PLAYERS ep
       INNER JOIN C##ALCANTARA.EVENT_LIST el ON ep.EVENTID = el.EVENTID
       INNER JOIN C##ALCANTARA.STUDENT_INFO s ON ep.STUDENTNUMBER = s.STUDENTNUMBER
       WHERE ep.EVENTID = :eventID 
       ORDER  BY ep.STUDENTNUMBER ASC`,
      [eventID],
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
