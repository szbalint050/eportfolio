export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  is_active: boolean;
  created_at: string;
  roles: string[];
}

export interface Portfolio {
  id: string;
  user_id: string;
  title: string;
  description: string;
  created_at: string;
}

export interface Project {
  id: string;
  portfolio_id: string;
  company_id?: string;
  name: string;
  description: string;
  tags: string[];
  image_url?: string;
  external_link?: string;
  likes: number;
  views: number;
  created_at: string;
}

export interface Skill {
  id: number;
  name: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
}

export interface UserPublicProfile {
  id: string;
  username: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  job_title?: string;
  skills: string[];
  created_at: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  roles: string[];
}
