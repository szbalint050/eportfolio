import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { store } from "../data/store";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: "username, email, and password are required" });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({ message: "Password must be at least 8 characters" });
    return;
  }
  if (store.users.find(u => u.email === email)) {
    res.status(409).json({ message: "Email already in use" });
    return;
  }

  const password_hash = await bcrypt.hash(password, 10);
  const now = new Date().toISOString();
  const user = {
    id: uuidv4(),
    username,
    email,
    password_hash,
    is_active: true,
    created_at: now,
    roles: ["user"],
  };
  store.users.push(user);

  // Create default portfolio and profile for new user
  const portfolioId = uuidv4();
  store.portfolios.push({
    id: portfolioId,
    user_id: user.id,
    title: `${username}'s Portfolio`,
    description: "",
    created_at: now,
  });
  store.profiles.set(user.id, {
    id: user.id,
    username,
    email,
    bio: "",
    avatar_url: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    twitter: "",
    job_title: "",
    skills: [],
    created_at: now,
  });

  const token = jwt.sign(
    { userId: user.id, email: user.email, roles: user.roles },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.status(201).json({
    token,
    user: { id: user.id, username: user.username, email: user.email, roles: user.roles },
  });
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "email and password are required" });
    return;
  }

  const user = store.users.find(u => u.email === email);
  if (!user || !user.is_active) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, roles: user.roles },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: { id: user.id, username: user.username, email: user.email, roles: user.roles },
  });
});

router.get("/me", authenticate, (req: AuthRequest, res: Response): void => {
  const profile = store.profiles.get(req.user!.userId);
  if (!profile) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(profile);
});

router.post("/logout", (_req: Request, res: Response): void => {
  // JWT is stateless — client discards the token
  res.json({ message: "Logged out successfully" });
});

export default router;
