import express from "express";

const router = express.Router();
router.use(express.json());

// Example logout route
router.post("/logout", (req, res) => {
  // Clear session data, revoke tokens, or delete cookies here
  res.clearCookie("token"); // Example: Clearing a token cookie

  // Optionally, respond with a success message or redirect to login page
  res.json({ success: true, message: "Logged out successfully" });
});

export default router;
