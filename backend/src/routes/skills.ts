import { Router, Request, Response } from "express";
import { authenticate, AuthRequest, requireAdmin } from "../middleware/auth";
import { store } from "../data/store";

const router = Router();

router.get("/", (_req: Request, res: Response): void => {
  res.json(store.skills);
});

router.post("/", authenticate, requireAdmin, (req: AuthRequest, res: Response): void => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "name is required" });
    return;
  }
  if (store.skills.find(s => s.name.toLowerCase() === name.toLowerCase())) {
    res.status(409).json({ message: "Skill already exists" });
    return;
  }
  const skill = { id: store.skills.length + 1, name };
  store.skills.push(skill);
  res.status(201).json(skill);
});

export default router;
