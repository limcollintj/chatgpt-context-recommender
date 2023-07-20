"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
/**
 * Retrieves the context from the local repository
 */
class localDBInstance {
    constructor(fileUrlPath) {
        this.fileUrlPath = fileUrlPath;
    }
    getContext(request) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(this.fileUrlPath, 'utf8', (err, data) => {
                if (err) {
                    reject(new Error(err.message));
                }
                const dbResponse = {
                    context: data,
                    numTokens: data === null || data === void 0 ? void 0 : data.length
                };
                resolve(dbResponse);
            });
        });
    }
}
exports.default = localDBInstance;
