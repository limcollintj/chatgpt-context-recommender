import ConfigModel from "../config/ConfigModel.js"

class PredictorModel {
    config: ConfigModel
    predictionApi: PredictionApi
    database: DBIterface

    constructor(config: ConfigModel, predictionApi: PredictionApi, database: DBIterface) {
        this.config = config
        this.predictionApi = predictionApi
        this.database = database
    }

    async generatePrompt (userInput : string) {
        const {context: contextString} = await this.database.getContext({})
        const {embedding} = await this.predictionApi.generateEmbeddings({
            context: contextString
        })
        return `Understand this context: ${embedding}. Now answer this question: ${userInput}`
    }

    /**
     * answerUserQuery builds the request and response necessary to answer a user's query
     */
    async answerUserQuery({userInput}: {userInput: string}) {
        try {
            const prompt = await this.generatePrompt(userInput)
            const predictionApiRequest : PredictionApiRequest = {
                prompt
            }
            const predictionApiResponse = this.predictionApi.predict(predictionApiRequest)
            return predictionApiResponse
        } catch (e) {
            console.log(e)
        }

    }

}

export default PredictorModel