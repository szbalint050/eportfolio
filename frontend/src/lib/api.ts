import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;

// Auth
export const authApi = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post("/auth/register", data),
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
  me: () => api.get("/auth/me"),
  logout: () => api.post("/auth/logout"),
};

// Profile
export const profileApi = {
  get: () => api.get("/profile"),
  update: (data: Partial<ProfileData>) => api.put("/profile", data),
};

// Projects
export const projectsApi = {
  list: () => api.get("/projects"),
  create: (data: Partial<ProjectData>) => api.post("/projects", data),
  update: (id: string, data: Partial<ProjectData>) => api.put(`/projects/${id}`, data),
  remove: (id: string) => api.delete(`/projects/${id}`),
};

// Skills
export const skillsApi = {
  list: () => api.get("/skills"),
};

export interface ProfileData {
  username: string;
  bio: string;
  avatar_url: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  job_title: string;
  skills: string[];
}

export interface ProjectData {
  id: string;
  portfolio_id: string;
  name: string;
  description: string;
  tags: string[];
  image_url: string;
  external_link: string;
  likes: number;
  views: number;
  created_at: string;
}
