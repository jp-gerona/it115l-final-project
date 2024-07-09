import express from "express";
import { dbCredentials, openConnection, closeConnection } from "../db.js";

const router = express.Router();
router.use(express.json());

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  let connection;

  try {
    connection = await openConnection();
    const result = await connection.execute(
      `SELECT * FROM ${dbCredentials.user}.Accounts WHERE AccountEmail = :accountemail AND AccountPassword = :accountpassword`,
      [email, password]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  } finally {
    await closeConnection(connection);
  }
});

export default router;
