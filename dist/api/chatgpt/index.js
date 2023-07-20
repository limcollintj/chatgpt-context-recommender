"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
class ChatGptApi {
    constructor(config) {
        const configuration = new openai_1.Configuration({
            apiKey: config.apiKey
        });
        this.openAi = new openai_1.OpenAIApi(configuration);
        this.config = config;
    }
    predict({ prompt }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const completion = yield this.openAi.createCompletion({
                prompt,
                model: this.config.model.toString(),
                temperature: this.config.temperature,
                max_tokens: 100
            });
            const responseText = completion.data.choices[0].text;
            const response = {
                result: responseText,
                tokensUsed: (_a = completion.data.usage) === null || _a === void 0 ? void 0 : _a.completion_tokens
            };
            return response;
        });
    }
    generateEmbeddings(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.openAi.createEmbedding({
                input: request.context,
                model: "text-embedding-ada-002" // default cheapest model
            });
            return {
                embedding: response.data.data[0].embedding
            };
        });
    }
}
exports.default = ChatGptApi;
