import jwt from "jsonwebtoken";

const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
    res.clearCookie("token");
  }
};

export default cookieJwtAuth;
