"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_1 = require("react-router");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
function MainLayout() {
    var _a = (0, react_1.useState)(false), isMobileMenuOpen = _a[0], setIsMobileMenuOpen = _a[1];
    var navItems = [
        { name: "Dashboard", path: "/dashboard", icon: lucide_react_1.LayoutDashboard },
        { name: "Profile", path: "/profile", icon: lucide_react_1.User },
        { name: "Projects", path: "/projects", icon: lucide_react_1.Briefcase },
        { name: "Schedule", path: "/schedule", icon: lucide_react_1.Calendar },
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-gray-50 flex", children: [(0, jsx_runtime_1.jsxs)("div", { className: "md:hidden fixed top-0 left-0 w-full bg-white border-b px-4 py-3 flex justify-between items-center z-50", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-gray-900", children: "PortfolioPro" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setIsMobileMenuOpen(!isMobileMenuOpen); }, children: isMobileMenuOpen ? (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 24 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Menu, { size: 24 }) })] }), (0, jsx_runtime_1.jsxs)("aside", { className: "".concat(isMobileMenuOpen ? "translate-x-0" : "-translate-x-full", " md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-200 ease-in-out z-40 pt-16 md:pt-0"), children: [(0, jsx_runtime_1.jsx)("div", { className: "hidden md:flex h-16 items-center px-6 border-b border-gray-200", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-gray-900", children: "PortfolioPro" }) }), (0, jsx_runtime_1.jsx)("nav", { className: "flex-1 px-4 py-6 space-y-1 overflow-y-auto", children: navItems.map(function (item) {
                            var Icon = item.icon;
                            return ((0, jsx_runtime_1.jsxs)(react_router_1.NavLink, { to: item.path, onClick: function () { return setIsMobileMenuOpen(false); }, className: function (_a) {
                                    var isActive = _a.isActive;
                                    return "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ".concat(isActive
                                        ? "bg-indigo-50 text-indigo-700"
                                        : "text-gray-700 hover:bg-gray-100");
                                }, children: [(0, jsx_runtime_1.jsx)(Icon, { className: "mr-3 h-5 w-5 flex-shrink-0" }), item.name] }, item.name));
                        }) }), (0, jsx_runtime_1.jsx)("div", { className: "p-4 border-t border-gray-200", children: (0, jsx_runtime_1.jsxs)(react_router_1.NavLink, { to: "/", className: "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { className: "mr-3 h-5 w-5 flex-shrink-0" }), "Sign Out"] }) })] }), (0, jsx_runtime_1.jsx)("main", { className: "flex-1 flex flex-col min-h-screen overflow-hidden pt-14 md:pt-0", children: (0, jsx_runtime_1.jsx)("div", { className: "flex-1 overflow-y-auto p-4 md:p-8", children: (0, jsx_runtime_1.jsx)(react_router_1.Outlet, {}) }) })] }));
}
