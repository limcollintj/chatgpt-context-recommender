import ConfigModel from "../config/ConfigModel.js"

class PredictorModel {
    config: ConfigModel
    predictionApi: PredictionApi

    constructor(config: ConfigModel, predictionApi: PredictionApi) {
        this.config = config
        this.predictionApi = predictionApi
    }

    /**
     * answerUserQuery builds the request and response necessary to answer a user's query
     */
    answerUserQuery(userInput: string) {
        const preictionApiRequest : PredictionApiRequest = {
            userInputString: userInput,
            apiKey: this.config.chatGptApiKey
        }
        const predictionApiResponse = this.predictionApi.predict(preictionApiRequest)
        return predictionApiResponse
    }

}

export default PredictorModel