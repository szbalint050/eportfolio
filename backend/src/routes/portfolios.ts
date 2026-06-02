import { Router, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { authenticate, AuthRequest } from "../middleware/auth";
import { store } from "../data/store";

const router = Router();

router.use(authenticate);

router.get("/", (req: AuthRequest, res: Response): void => {
  const userPortfolios = store.portfolios.filter(p => p.user_id === req.user!.userId);
  res.json(userPortfolios);
});

router.post("/", (req: AuthRequest, res: Response): void => {
  const { title, description } = req.body;
  if (!title) {
    res.status(400).json({ message: "title is required" });
    return;
  }
  const portfolio = {
    id: uuidv4(),
    user_id: req.user!.userId,
    title,
    description: description ?? "",
    created_at: new Date().toISOString(),
  };
  store.portfolios.push(portfolio);
  res.status(201).json(portfolio);
});

router.get("/:id", (req: AuthRequest, res: Response): void => {
  const portfolio = store.portfolios.find(p => p.id === req.params.id && p.user_id === req.user!.userId);
  if (!portfolio) {
    res.status(404).json({ message: "Portfolio not found" });
    return;
  }
  res.json(portfolio);
});

router.put("/:id", (req: AuthRequest, res: Response): void => {
  const idx = store.portfolios.findIndex(p => p.id === req.params.id && p.user_id === req.user!.userId);
  if (idx === -1) {
    res.status(404).json({ message: "Portfolio not found" });
    return;
  }
  const { title, description } = req.body;
  if (title) store.portfolios[idx].title = title;
  if (description !== undefined) store.portfolios[idx].description = description;
  res.json(store.portfolios[idx]);
});

router.delete("/:id", (req: AuthRequest, res: Response): void => {
  const idx = store.portfolios.findIndex(p => p.id === req.params.id && p.user_id === req.user!.userId);
  if (idx === -1) {
    res.status(404).json({ message: "Portfolio not found" });
    return;
  }
  store.portfolios.splice(idx, 1);
  // Remove associated projects
  const removed = store.projects.filter(p => p.portfolio_id !== req.params.id);
  store.projects.length = 0;
  store.projects.push(...removed);
  res.json({ message: "Portfolio deleted" });
});

// Projects nested under portfolio
router.get("/:id/projects", (req: AuthRequest, res: Response): void => {
  const portfolio = store.portfolios.find(p => p.id === req.params.id && p.user_id === req.user!.userId);
  if (!portfolio) {
    res.status(404).json({ message: "Portfolio not found" });
    return;
  }
  const portfolioProjects = store.projects.filter(p => p.portfolio_id === req.params.id);
  res.json(portfolioProjects);
});

export default router;
