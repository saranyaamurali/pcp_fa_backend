import jwt from "jsonwebtoken";

const authMiddleware = (
  req,
  res,
  next
) => {
  const header =
    req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      success: false,
      message:
        "No token provided",
    });
  }

  const token =
    header.split(" ")[1];

  try {
    const decoded =
      jwt.verify(
        token,
        "secretkey"
      );

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message:
        "Invalid token",
    });
  }
};

export default authMiddleware;