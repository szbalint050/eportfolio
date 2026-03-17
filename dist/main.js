"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var client_1 = require("react-dom/client");
var App_tsx_1 = require("./app/App.tsx");
require("./styles/index.css");
(0, client_1.createRoot)(document.getElementById("root")).render((0, jsx_runtime_1.jsx)(App_tsx_1.default, {}));
