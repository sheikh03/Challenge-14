import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response): Promise<void> => {
  // Implementing user authentication
  const { username, password } = req.body;

  try {
    // Validate input data
    if (!username || !password) {
      res.status(400).json({ message: "Missing credentials" });
      return;
    }

    // Find user in database
    const userAccount = await User.findOne({ where: { username } });

    if (!userAccount) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    // Verify password match
    const passwordMatch = await bcrypt.compare(password, userAccount.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    // Generate JWT token
    const authToken = jwt.sign(
      { username: userAccount.username },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.json({ token: authToken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server authentication error" });
  }
};

const router = Router();

// POST /login - Login a user
router.post("/login", login);

export default router;