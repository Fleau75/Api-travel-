import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access token is missing." });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Ajoute les informations utilisateur à la requête
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
