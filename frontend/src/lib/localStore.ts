// localStorage-based data layer — no backend required

export interface StoredUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  roles: string[];
  createdAt: string;
}

export interface StoredProfile {
  userId: string;
  username: string;
  email: string;
  bio: string;
  avatarUrl: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  jobTitle: string;
  skills: string[];
}

export interface StoredProject {
  id: string;
  userId: string;
  name: string;
  description: string;
  tags: string[];
  imageUrl: string;
  externalLink: string;
  likes: number;
  views: number;
  createdAt: string;
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Simple hash using btoa — not cryptographic, but sufficient for a client-side demo
function hashPassword(password: string): string {
  return btoa(encodeURIComponent(password + "_portfoliopro_salt"));
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

function uuid(): string {
  return crypto.randomUUID();
}

export const localStore = {
  // ── Users ──────────────────────────────────────────────
  getUsers(): StoredUser[] {
    return load<StoredUser[]>("pp_users", []);
  },
  findUserByEmail(email: string): StoredUser | undefined {
    return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  findUserById(id: string): StoredUser | undefined {
    return this.getUsers().find(u => u.id === id);
  },
  registerUser(username: string, email: string, password: string): StoredUser | { error: string } {
    const users = this.getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { error: "An account with this email already exists." };
    }
    if (password.length < 8) {
      return { error: "Password must be at least 8 characters." };
    }
    const user: StoredUser = {
      id: uuid(),
      username,
      email,
      passwordHash: hashPassword(password),
      roles: ["user"],
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    save("pp_users", users);

    // Create default profile
    this.createDefaultProfile(user);
    return user;
  },
  loginUser(email: string, password: string): StoredUser | { error: string } {
    const user = this.findUserByEmail(email);
    if (!user) return { error: "Invalid email or password." };
    if (!verifyPassword(password, user.passwordHash)) return { error: "Invalid email or password." };
    return user;
  },

  // ── Sessions ───────────────────────────────────────────
  setSession(userId: string) {
    localStorage.setItem("pp_session", userId);
  },
  getSession(): string | null {
    return localStorage.getItem("pp_session");
  },
  clearSession() {
    localStorage.removeItem("pp_session");
  },

  // ── Profiles ───────────────────────────────────────────
  createDefaultProfile(user: StoredUser) {
    const profiles = load<StoredProfile[]>("pp_profiles", []);
    if (!profiles.find(p => p.userId === user.id)) {
      profiles.push({
        userId: user.id,
        username: user.username,
        email: user.email,
        bio: "",
        avatarUrl: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
        twitter: "",
        jobTitle: "",
        skills: [],
      });
      save("pp_profiles", profiles);
    }
  },
  getProfile(userId: string): StoredProfile | undefined {
    return load<StoredProfile[]>("pp_profiles", []).find(p => p.userId === userId);
  },
  updateProfile(userId: string, data: Partial<StoredProfile>): StoredProfile {
    const profiles = load<StoredProfile[]>("pp_profiles", []);
    const idx = profiles.findIndex(p => p.userId === userId);
    if (idx === -1) throw new Error("Profile not found");
    profiles[idx] = { ...profiles[idx], ...data, userId };
    save("pp_profiles", profiles);

    // Sync username in users
    if (data.username) {
      const users = this.getUsers();
      const ui = users.findIndex(u => u.id === userId);
      if (ui !== -1) { users[ui].username = data.username; save("pp_users", users); }
    }
    return profiles[idx];
  },

  // ── Projects ───────────────────────────────────────────
  getProjects(userId: string): StoredProject[] {
    return load<StoredProject[]>("pp_projects", []).filter(p => p.userId === userId);
  },
  addProject(userId: string, data: Omit<StoredProject, "id" | "userId" | "likes" | "views" | "createdAt">): StoredProject {
    const projects = load<StoredProject[]>("pp_projects", []);
    const project: StoredProject = {
      id: uuid(),
      userId,
      likes: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      ...data,
    };
    projects.push(project);
    save("pp_projects", projects);
    return project;
  },
  updateProject(userId: string, projectId: string, data: Partial<StoredProject>): StoredProject {
    const projects = load<StoredProject[]>("pp_projects", []);
    const idx = projects.findIndex(p => p.id === projectId && p.userId === userId);
    if (idx === -1) throw new Error("Project not found");
    projects[idx] = { ...projects[idx], ...data, id: projectId, userId };
    save("pp_projects", projects);
    return projects[idx];
  },
  deleteProject(userId: string, projectId: string) {
    const projects = load<StoredProject[]>("pp_projects", []);
    save("pp_projects", projects.filter(p => !(p.id === projectId && p.userId === userId)));
  },

  // ── Skills ─────────────────────────────────────────────
  getSkills(): string[] {
    return [
      "JavaScript", "TypeScript", "React", "Node.js", "Python",
      "PostgreSQL", "Docker", "UI/UX Design", "Figma", "HTML/CSS",
      "REST API", "Git", "Vue.js", "Java", "C#", "PHP", "MongoDB",
    ];
  },
};
