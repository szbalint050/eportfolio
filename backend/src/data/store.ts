import { User, Portfolio, Project, Skill, Company, UserPublicProfile } from "../models/types";

// In-memory data store — replace with PostgreSQL queries when DB is configured
const users: User[] = [];
const profiles: Map<string, UserPublicProfile> = new Map();
const portfolios: Portfolio[] = [];
const projects: Project[] = [];
const skills: Skill[] = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "TypeScript" },
  { id: 3, name: "React" },
  { id: 4, name: "Node.js" },
  { id: 5, name: "Python" },
  { id: 6, name: "PostgreSQL" },
  { id: 7, name: "Docker" },
  { id: 8, name: "UI/UX Design" },
  { id: 9, name: "Figma" },
  { id: 10, name: "HTML/CSS" },
  { id: 11, name: "REST API" },
  { id: 12, name: "Git" },
];
const companies: Company[] = [];

export const store = {
  users,
  profiles,
  portfolios,
  projects,
  skills,
  companies,
};
