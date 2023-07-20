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
class PredictorModel {
    constructor(config, predictionApi, database) {
        this.config = config;
        this.predictionApi = predictionApi;
        this.database = database;
    }
    generatePrompt(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { context: contextString } = yield this.database.getContext({});
            const { embedding } = yield this.predictionApi.generateEmbeddings({
                context: contextString
            });
            return `Understand this context: ${embedding}. Now answer this question: ${userInput}`;
        });
    }
    /**
     * answerUserQuery builds the request and response necessary to answer a user's query
     */
    answerUserQuery({ userInput }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prompt = yield this.generatePrompt(userInput);
                const predictionApiRequest = {
                    prompt
                };
                const predictionApiResponse = this.predictionApi.predict(predictionApiRequest);
                return predictionApiResponse;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = PredictorModel;
