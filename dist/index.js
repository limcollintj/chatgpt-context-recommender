"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// Configs
const port = 3000;
(0, server_1.default)(app, port);
