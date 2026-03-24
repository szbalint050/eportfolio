"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_1 = require("react-router");
var lucide_react_1 = require("lucide-react");
function Home() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-white", children: [(0, jsx_runtime_1.jsx)("header", { className: "border-b border-gray-100", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-gray-900", children: "PortfolioPro" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-x-4", children: [(0, jsx_runtime_1.jsx)(react_router_1.Link, { to: "/login", className: "text-gray-600 hover:text-gray-900 font-medium", children: "Log in" }), (0, jsx_runtime_1.jsx)(react_router_1.Link, { to: "/login", className: "bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition", children: "Sign up" })] })] }) }), (0, jsx_runtime_1.jsxs)("main", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center", children: [(0, jsx_runtime_1.jsxs)("h1", { className: "text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl mb-6", children: ["Showcase your work.", (0, jsx_runtime_1.jsx)("br", { className: "hidden sm:block" }), (0, jsx_runtime_1.jsx)("span", { className: "text-indigo-600", children: "Attract opportunities." })] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-4 text-xl text-gray-500 max-w-2xl mx-auto mb-10", children: "The all-in-one e-portfolio platform for professionals. Build your profile, display your projects, and schedule meetings with potential clients seamlessly." }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center gap-4", children: [(0, jsx_runtime_1.jsxs)(react_router_1.Link, { to: "/login", className: "flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition", children: ["Get Started", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "ml-2 h-5 w-5" })] }), (0, jsx_runtime_1.jsx)(react_router_1.Link, { to: "/dashboard", className: "flex items-center bg-gray-100 text-gray-900 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-200 transition", children: "View Demo" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "bg-gray-50 py-24", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
                                    {
                                        title: "Dashboard Analytics",
                                        description: "Track views and engagement on your portfolio.",
                                        icon: lucide_react_1.LayoutDashboard,
                                    },
                                    {
                                        title: "Professional Profile",
                                        description: "Highlight your skills, experience, and background.",
                                        icon: lucide_react_1.UserCircle,
                                    },
                                    {
                                        title: "Project Showcase",
                                        description: "Display case studies, companies, and achievements.",
                                        icon: lucide_react_1.Briefcase,
                                    },
                                    {
                                        title: "Meeting Scheduler",
                                        description: "Let clients book time with you directly.",
                                        icon: lucide_react_1.Calendar,
                                    },
                                ].map(function (feature, i) {
                                    var Icon = feature.icon;
                                    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4", children: (0, jsx_runtime_1.jsx)(Icon, { className: "h-6 w-6" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold text-gray-900 mb-2", children: feature.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: feature.description })] }, i));
                                }) }) }) })] })] }));
}
