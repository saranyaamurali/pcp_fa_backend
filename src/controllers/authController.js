import jwt from "jsonwebtoken";

export const login = async (
  req,
  res
) => {
  const { username, password } =
    req.body;

  if (
    username === "admin" &&
    password === "admin123"
  ) {
    const token = jwt.sign(
      {
        username,
      },
      "secretkey",
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
    });
  }

  return res.status(401).json({
    success: false,
    message:
      "Invalid credentials",
  });
};

export const me = async (
  req,
  res
) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};