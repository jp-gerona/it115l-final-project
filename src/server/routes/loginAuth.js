import express from "express";
import { dbCredentials, openConnection, closeConnection } from "../db.js";
import jwt from "jsonwebtoken";

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
      const user = result.metaData.reduce((acc, meta, index) => {
        acc[meta.name.toLowerCase()] = result.rows[0][index];
        return acc;
      }, {});
      const token = jwt.sign(
        { userId: user.accountid, email: user.accountemail },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, {
        httpOnly: true,
      });
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }
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
