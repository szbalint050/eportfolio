"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Projects;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
function Projects() {
    var projects = [
        {
            id: 1,
            title: "Fintech Mobile Application",
            category: "Mobile Design",
            image: "https://images.unsplash.com/photo-1627757818592-ce2649563a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBwcm9qZWN0fGVufDF8fHx8MTc3MzI2MTQ4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            description: "A comprehensive redesign of a leading banking application focusing on accessibility and seamless transactions.",
            tags: ["Figma", "iOS", "Prototyping"],
            likes: 124,
            views: "2.1k",
        },
        {
            id: 2,
            title: "E-Commerce Web Platform",
            category: "Web Design",
            image: "https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzMxODE3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            description: "A modern storefront template with optimized checkout flows and product discovery features.",
            tags: ["React", "UI/UX", "Tailwind"],
            likes: 89,
            views: "1.5k",
        },
        {
            id: 3,
            title: "Corporate Identity & Branding",
            category: "Branding",
            image: "https://images.unsplash.com/photo-1642522029695-2d4d222e41f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBtZWV0aW5nfGVufDF8fHx8MTc3MzI2MTQ4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            description: "Complete visual identity overhaul for a B2B SaaS company, including logo, typography, and marketing assets.",
            tags: ["Illustrator", "Brand Strategy", "Typography"],
            likes: 210,
            views: "3.4k",
        },
        {
            id: 4,
            title: "Healthcare Dashboard",
            category: "Product Design",
            image: "https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzMxODE3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            description: "Admin portal for hospital staff to manage patient records efficiently while adhering to HIPAA guidelines.",
            tags: ["Dashboard", "UX Research", "Wireframing"],
            likes: 156,
            views: "1.8k",
        }
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "Portfolio Projects" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500 text-sm mt-1", children: "Manage and showcase your best work" })] }), (0, jsx_runtime_1.jsxs)("button", { className: "bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "w-5 h-5 mr-2" }), " Add Project"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row gap-4 mb-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Search projects...", className: "w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white" })] }), (0, jsx_runtime_1.jsxs)("button", { className: "px-4 py-2 border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { className: "w-5 h-5 mr-2" }), " Filter by category"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: projects.map(function (project) { return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition duration-200", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative h-48 overflow-hidden", children: [(0, jsx_runtime_1.jsx)("img", { src: project.image, alt: project.title, className: "w-full h-full object-cover transition duration-300 group-hover:scale-105" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800", children: project.category }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("button", { className: "bg-white text-gray-900 p-2 rounded-full hover:bg-indigo-50", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, { className: "w-5 h-5" }) }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-5", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold text-gray-900 mb-2", children: project.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 mb-4 line-clamp-2", children: project.description }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2 mb-4", children: project.tags.map(function (tag, idx) { return ((0, jsx_runtime_1.jsx)("span", { className: "bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium", children: tag }, idx)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center pt-4 border-t border-gray-100 text-sm text-gray-500", children: [(0, jsx_runtime_1.jsxs)("span", { children: [project.likes, " Likes"] }), (0, jsx_runtime_1.jsxs)("span", { children: [project.views, " Views"] })] })] })] }, project.id)); }) })] }));
}
