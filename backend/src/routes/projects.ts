import { Router, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { authenticate, AuthRequest } from "../middleware/auth";
import { store } from "../data/store";

const router = Router();

router.use(authenticate);

function getUserPortfolioIds(userId: string): string[] {
  return store.portfolios.filter(p => p.user_id === userId).map(p => p.id);
}

router.get("/", (req: AuthRequest, res: Response): void => {
  const portfolioIds = getUserPortfolioIds(req.user!.userId);
  const userProjects = store.projects.filter(p => portfolioIds.includes(p.portfolio_id));
  res.json(userProjects);
});

router.post("/", (req: AuthRequest, res: Response): void => {
  const { portfolio_id, name, description, tags, image_url, external_link } = req.body;
  if (!name) {
    res.status(400).json({ message: "name is required" });
    return;
  }

  const portfolioIds = getUserPortfolioIds(req.user!.userId);
  let targetPortfolioId = portfolio_id;

  if (!targetPortfolioId) {
    targetPortfolioId = portfolioIds[0];
  }
  if (!portfolioIds.includes(targetPortfolioId)) {
    res.status(403).json({ message: "Portfolio not found or not owned by user" });
    return;
  }

  const project = {
    id: uuidv4(),
    portfolio_id: targetPortfolioId,
    name,
    description: description ?? "",
    tags: tags ?? [],
    image_url: image_url ?? "",
    external_link: external_link ?? "",
    likes: 0,
    views: 0,
    created_at: new Date().toISOString(),
  };
  store.projects.push(project);
  res.status(201).json(project);
});

router.get("/:id", (req: AuthRequest, res: Response): void => {
  const portfolioIds = getUserPortfolioIds(req.user!.userId);
  const project = store.projects.find(p => p.id === req.params.id && portfolioIds.includes(p.portfolio_id));
  if (!project) {
    res.status(404).json({ message: "Project not found" });
    return;
  }
  // Increment views
  project.views += 1;
  res.json(project);
});

router.put("/:id", (req: AuthRequest, res: Response): void => {
  const portfolioIds = getUserPortfolioIds(req.user!.userId);
  const idx = store.projects.findIndex(p => p.id === req.params.id && portfolioIds.includes(p.portfolio_id));
  if (idx === -1) {
    res.status(404).json({ message: "Project not found" });
    return;
  }

  const p = store.projects[idx] as unknown as Record<string, unknown>;
  const allowed = ["name", "description", "tags", "image_url", "external_link"];
  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      p[key] = req.body[key];
    }
  }
  res.json(store.projects[idx]);
});

router.delete("/:id", (req: AuthRequest, res: Response): void => {
  const portfolioIds = getUserPortfolioIds(req.user!.userId);
  const idx = store.projects.findIndex(p => p.id === req.params.id && portfolioIds.includes(p.portfolio_id));
  if (idx === -1) {
    res.status(404).json({ message: "Project not found" });
    return;
  }
  store.projects.splice(idx, 1);
  res.json({ message: "Project deleted" });
});

export default router;
