import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

export const adminLogin = (req: Request, res: Response): void => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid payload" });
    return;
  }

  const { username, password } = parsed.data;
  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminUser || !adminPassword || !jwtSecret) {
    res.status(500).json({ message: "Server env not configured" });
    return;
  }

  if (username !== adminUser || password !== adminPassword) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ username }, jwtSecret, { expiresIn: "12h" });
  res.json({ token });
};
