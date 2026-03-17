"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var react_router_1 = require("react-router");
var MainLayout_1 = require("./layouts/MainLayout");
var Home_1 = require("./pages/Home");
var Login_1 = require("./pages/Login");
var Dashboard_1 = require("./pages/Dashboard");
var Profile_1 = require("./pages/Profile");
var Projects_1 = require("./pages/Projects");
var Schedule_1 = require("./pages/Schedule");
exports.router = (0, react_router_1.createBrowserRouter)([
    {
        path: "/",
        Component: Home_1.default,
    },
    {
        path: "/login",
        Component: Login_1.default,
    },
    {
        path: "/",
        Component: MainLayout_1.default,
        children: [
            {
                path: "dashboard",
                Component: Dashboard_1.default,
            },
            {
                path: "profile",
                Component: Profile_1.default,
            },
            {
                path: "projects",
                Component: Projects_1.default,
            },
            {
                path: "schedule",
                Component: Schedule_1.default,
            }
        ],
    },
]);
