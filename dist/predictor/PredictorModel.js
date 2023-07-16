"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PredictorModel {
    constructor(config, predictionApi) {
        this.config = config;
        this.predictionApi = predictionApi;
    }
    /**
     * answerUserQuery builds the request and response necessary to answer a user's query
     */
    answerUserQuery(userInput) {
        const preictionApiRequest = {
            userInputString: userInput,
            apiKey: this.config.chatGptApiKey
        };
        const predictionApiResponse = this.predictionApi.predict(preictionApiRequest);
        return predictionApiResponse;
    }
}
exports.default = PredictorModel;
