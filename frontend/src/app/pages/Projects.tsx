import { useState, useEffect } from "react";
import { Search, Plus, ExternalLink, Trash2, X, Save } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { localStore, StoredProject } from "../../lib/localStore";

type ProjectForm = { name: string; description: string; tags: string[]; imageUrl: string; externalLink: string; };

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<StoredProject[]>([]);
  const [allSkills, setAllSkills] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProjectForm>({ name: "", description: "", tags: [], imageUrl: "", externalLink: "" });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!user) return;
    setProjects(localStore.getProjects(user.id));
    setAllSkills(localStore.getSkills());
  }, [user]);

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  function toggleTag(name: string) {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(name) ? f.tags.filter(t => t !== name) : [...f.tags, name],
    }));
  }

  function handleAdd() {
    if (!user) return;
    if (!form.name.trim()) { setFormError("Project name is required."); return; }
    setSaving(true);
    setFormError("");
    try {
      const created = localStore.addProject(user.id, {
        name: form.name.trim(),
        description: form.description,
        tags: form.tags,
        imageUrl: form.imageUrl,
        externalLink: form.externalLink,
      });
      setProjects(p => [created, ...p]);
      setForm({ name: "", description: "", tags: [], imageUrl: "", externalLink: "" });
      setShowForm(false);
    } catch {
      setFormError("Failed to create project. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleDelete(id: string) {
    if (!user) return;
    if (!confirm("Delete this project?")) return;
    localStore.deleteProject(user.id, id);
    setProjects(p => p.filter(pr => pr.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio Projects</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and showcase your best work</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setFormError(""); }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Project
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">New Project</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
          </div>
          {formError && <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">{formError}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Project Name *</label>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="My Awesome Project" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Image URL</label>
              <input type="text" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://…" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Describe your project…" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">External Link</label>
              <input type="text" value={form.externalLink} onChange={e => setForm(f => ({ ...f, externalLink: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://github.com/…" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Tags / Skills</label>
              <div className="flex flex-wrap gap-2">
                {allSkills.map(s => {
                  const selected = form.tags.includes(s);
                  return (
                    <button key={s} type="button" onClick={() => toggleTag(s)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border transition ${selected ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-100 text-gray-700 border-gray-200 hover:border-indigo-400"}`}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
            <button onClick={handleAdd} disabled={saving} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 flex items-center">
              <Save className="w-4 h-4 mr-2" /> {saving ? "Saving…" : "Add Project"}
            </button>
          </div>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search projects…"
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          {projects.length === 0 ? "No projects yet. Add your first one!" : "No projects match your search."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(project => (
            <div key={project.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition duration-200">
              <div className="relative h-48 overflow-hidden bg-indigo-50">
                {project.imageUrl
                  ? <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                  : <div className="w-full h-full flex items-center justify-center text-indigo-300 text-6xl font-bold">{project.name.charAt(0)}</div>}
                {project.externalLink && (
                  <a href={project.externalLink} target="_blank" rel="noreferrer"
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-gray-900 p-2 rounded-full hover:bg-indigo-50"><ExternalLink className="w-5 h-5" /></span>
                  </a>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">{tag}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-sm text-gray-500">
                  <span>{project.likes} Likes</span>
                  <span>{project.views} Views</span>
                  <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:text-red-600 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
