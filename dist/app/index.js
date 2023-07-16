"use strict";
// App level
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbInstance_1 = __importDefault(require("../database/localDBInstance/dbInstance"));
// Entry point for running the predictor model
const predict = () => {
    const dbInstance = new dbInstance_1.default();
};
