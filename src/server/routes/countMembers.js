import express from "express";
import { dbCredentials, openConnection, closeConnection } from "../db.js";

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
    let connection;
  
    try {
      connection = await openConnection();
      const result = await connection.execute(`
          SELECT houseName, COUNT(*) as members
          FROM ${dbCredentials.user}.Student_Info
          GROUP BY houseName
        `);
  
      // Map the result to match the expected structure
      const formattedResult = result.rows.map(row => ({
        houseName: row[0], // houseName
        members: row[1],   // members
      }));
  
      res.json(formattedResult);
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
