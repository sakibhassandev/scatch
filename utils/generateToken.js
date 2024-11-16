import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign(
    { email: user.email, userId: user._id },
    process.env.JWT_SECRET
  );
  return token;
};
