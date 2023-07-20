"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigModel {
    constructor({ chatGptApiKey, databaseType, modelType }) {
        this.chatGptApiKey = chatGptApiKey;
        this.databaseType = databaseType;
        this.modelType = modelType;
    }
}
exports.default = ConfigModel;
