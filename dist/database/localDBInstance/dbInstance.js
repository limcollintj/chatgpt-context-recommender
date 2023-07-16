"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Retrieves the context from the local repository
 */
class localDBInstance {
    constructor() {
    }
    getContext(request) {
        const dbResponse = {
            context: "",
            numTokens: 1 // TODO
        };
        return dbResponse;
    }
}
exports.default = localDBInstance;
