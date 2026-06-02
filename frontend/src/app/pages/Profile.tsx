import { useState, useEffect, useRef } from "react";
import { MapPin, Link as LinkIcon, Edit3, Plus, Github, Linkedin, Twitter, Save, X, Camera, ExternalLink, Briefcase } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { localStore, StoredProfile, StoredProject } from "../../lib/localStore";

type ProfileForm = Omit<StoredProfile, "userId" | "email">;

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<StoredProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<ProfileForm>({
    username: "", bio: "", avatarUrl: "", location: "",
    website: "", linkedin: "", github: "", twitter: "", jobTitle: "", skills: [],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [projects, setProjects] = useState<StoredProject[]>([]);
  const allSkills = localStore.getSkills();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    const p = localStore.getProfile(user.id);
    if (p) { setProfile(p); setForm(toForm(p)); }
    setProjects(localStore.getProjects(user.id));
  }, [user]);

  function toForm(p: StoredProfile): ProfileForm {
    return { username: p.username, bio: p.bio, avatarUrl: p.avatarUrl, location: p.location, website: p.website, linkedin: p.linkedin, github: p.github, twitter: p.twitter, jobTitle: p.jobTitle, skills: [...p.skills] };
  }

  function startEdit() { if (profile) setForm(toForm(profile)); setEditing(true); setError(""); }
  function cancelEdit() { setEditing(false); setError(""); }

  async function saveProfile() {
    if (!user) return;
    setSaving(true);
    setError("");
    try {
      const updated = localStore.updateProfile(user.id, form);
      setProfile(updated);
      setEditing(false);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function toggleSkill(name: string) {
    setForm(f => ({
      ...f,
      skills: f.skills.includes(name) ? f.skills.filter(s => s !== name) : [...f.skills, name],
    }));
  }

  function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const base64 = ev.target?.result as string;
      setForm(f => ({ ...f, avatarUrl: base64 }));
    };
    reader.readAsDataURL(file);
  }

  if (!profile) return (
    <div className="flex items-center justify-center h-64 text-gray-400">Loading profile…</div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Cover + avatar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 w-full relative" />
        <div className="px-6 sm:px-10 pb-8">
          <div className="relative flex justify-between items-end -mt-16 sm:-mt-20 mb-6">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
              <div className="w-full h-full rounded-full border-4 border-white shadow-md bg-indigo-100 flex items-center justify-center text-4xl font-bold text-indigo-600 overflow-hidden">
                {(editing ? form.avatarUrl : profile.avatarUrl)
                  ? <img src={editing ? form.avatarUrl : profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  : profile.username.charAt(0).toUpperCase()}
              </div>
              {editing && (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-1 right-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 shadow-md transition"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
                </>
              )}
            </div>
            <div className="flex gap-3 mb-2">
              {editing ? (
                <>
                  <button onClick={cancelEdit} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 flex items-center gap-1">
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button onClick={saveProfile} disabled={saving} className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-700 text-white flex items-center gap-1 disabled:opacity-60">
                    <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save"}
                  </button>
                </>
              ) : (
                <button onClick={startEdit} className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-700 text-white flex items-center gap-1">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

          {editing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Username" value={form.username} onChange={v => setForm(f => ({ ...f, username: v }))} />
              <Field label="Job Title" value={form.jobTitle} onChange={v => setForm(f => ({ ...f, jobTitle: v }))} placeholder="e.g. React Developer" />
              <Field label="Location" value={form.location} onChange={v => setForm(f => ({ ...f, location: v }))} placeholder="e.g. Budapest" />
              <Field label="Website" value={form.website} onChange={v => setForm(f => ({ ...f, website: v }))} placeholder="https://…" />
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.username}</h1>
              {profile.jobTitle && <p className="text-lg text-gray-600 mt-1">{profile.jobTitle}</p>}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                {profile.location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{profile.location}</span>}
                {profile.website && <span className="flex items-center gap-1"><LinkIcon className="w-4 h-4" />{profile.website}</span>}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
            {editing ? (
              <textarea
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                rows={5}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Tell the world a little about yourself…"
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {profile.bio || <span className="text-gray-400 italic">No bio yet. Click "Edit Profile" to add one.</span>}
              </p>
            )}
          </div>

          {/* Projects */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Projects</h2>
              <Link to="/projects" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                Manage →
              </Link>
            </div>
            {projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Briefcase className="w-10 h-10 text-gray-200 mb-3" />
                <p className="text-gray-400 text-sm">No projects yet.</p>
                <Link to="/projects" className="mt-3 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Add your first project →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map(project => (
                  <div key={project.id} className="group rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition duration-200">
                    <div className="relative h-36 bg-indigo-50 overflow-hidden">
                      {project.imageUrl
                        ? <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        : <div className="w-full h-full flex items-center justify-center text-indigo-200 text-5xl font-bold">{project.name.charAt(0)}</div>}
                      {project.externalLink && (
                        <a
                          href={project.externalLink}
                          target="_blank"
                          rel="noreferrer"
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <span className="bg-white text-gray-900 p-2 rounded-full"><ExternalLink className="w-4 h-4" /></span>
                        </a>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm">{project.name}</h3>
                      {project.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{project.description}</p>
                      )}
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{tag}</span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-xs text-gray-400">+{project.tags.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Skills</h2>
              {!editing && <button onClick={startEdit} className="text-gray-400 hover:text-indigo-600"><Plus className="w-5 h-5" /></button>}
            </div>
            {editing ? (
              <div className="flex flex-wrap gap-2">
                {allSkills.map(s => {
                  const selected = form.skills.includes(s);
                  return (
                    <button key={s} type="button" onClick={() => toggleSkill(s)}
                      className={`px-3 py-1 rounded-full text-sm font-medium border transition ${selected ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-100 text-gray-700 border-gray-200 hover:border-indigo-400"}`}>
                      {s}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills.length > 0
                  ? profile.skills.map(s => <span key={s} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{s}</span>)
                  : <span className="text-gray-400 text-sm italic">No skills added yet.</span>}
              </div>
            )}
          </div>

          {/* Social */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Social Links</h2>
            {editing ? (
              <div className="space-y-3">
                <Field label="LinkedIn" value={form.linkedin} onChange={v => setForm(f => ({ ...f, linkedin: v }))} placeholder="https://linkedin.com/in/…" />
                <Field label="GitHub" value={form.github} onChange={v => setForm(f => ({ ...f, github: v }))} placeholder="https://github.com/…" />
                <Field label="Twitter / X" value={form.twitter} onChange={v => setForm(f => ({ ...f, twitter: v }))} placeholder="https://twitter.com/…" />
              </div>
            ) : (
              <div className="space-y-3">
                {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition"><Linkedin className="w-5 h-5" /> LinkedIn</a>}
                {profile.github && <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition"><Github className="w-5 h-5" /> GitHub</a>}
                {profile.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition"><Twitter className="w-5 h-5" /> Twitter / X</a>}
                {!profile.linkedin && !profile.github && !profile.twitter && <span className="text-gray-400 text-sm italic">No links added yet.</span>}
              </div>
            )}
          </div>

          {/* Account */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Account</h2>
            <p className="text-sm text-gray-500 mb-4">{profile.email}</p>
            <button onClick={logout} className="w-full py-2 px-4 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </div>
  );
}
