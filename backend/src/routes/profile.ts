import { Router, Response } from "express";
import { authenticate, AuthRequest } from "../middleware/auth";
import { store } from "../data/store";

const router = Router();

router.use(authenticate);

router.get("/", (req: AuthRequest, res: Response): void => {
  const profile = store.profiles.get(req.user!.userId);
  if (!profile) {
    res.status(404).json({ message: "Profile not found" });
    return;
  }
  res.json(profile);
});

router.put("/", (req: AuthRequest, res: Response): void => {
  const current = store.profiles.get(req.user!.userId);
  if (!current) {
    res.status(404).json({ message: "Profile not found" });
    return;
  }

  const allowed = ["username", "bio", "avatar_url", "location", "website", "linkedin", "github", "twitter", "job_title", "skills"];
  const updated = { ...current };
  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      (updated as Record<string, unknown>)[key] = req.body[key];
    }
  }

  store.profiles.set(req.user!.userId, updated);

  // Sync username in users array
  if (req.body.username) {
    const user = store.users.find(u => u.id === req.user!.userId);
    if (user) user.username = req.body.username;
  }

  res.json(updated);
});

router.delete("/", (req: AuthRequest, res: Response): void => {
  store.profiles.delete(req.user!.userId);
  const idx = store.users.findIndex(u => u.id === req.user!.userId);
  if (idx !== -1) store.users[idx].is_active = false;
  res.json({ message: "Profile removed" });
});

export default router;
