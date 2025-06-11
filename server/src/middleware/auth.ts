import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Implementing token verification
  const authHeader = req.headers["authorization"];
  const authToken = authHeader && authHeader.split(" ")[1]; // Extract token after "Bearer"

  if (!authToken) {
    res.status(401).json({ message: "No authentication token provided" });
    return;
  }

  try {
    const verifiedData = jwt.verify(
      authToken,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;
    req.user = verifiedData;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};