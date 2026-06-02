import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/auth";
import profileRouter from "./routes/profile";
import portfoliosRouter from "./routes/portfolios";
import projectsRouter from "./routes/projects";
import skillsRouter from "./routes/skills";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/portfolios", portfoliosRouter);
app.use("/projects", projectsRouter);
app.use("/skills", skillsRouter);

export default app;
