"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_1 = require("react-router");
var routes_1 = require("./routes");
function App() {
    return (0, jsx_runtime_1.jsx)(react_router_1.RouterProvider, { router: routes_1.router });
}
