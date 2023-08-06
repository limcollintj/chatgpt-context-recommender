class PredictorModel {
    constructor(config, predictionApi, database) {
        this.config = config;
        this.predictionApi = predictionApi;
        this.database = database;
    }
    async generatePrompt(userInput) {
        const { context: contextString } = await this.database.getContext({});
        const { embedding } = await this.predictionApi.generateEmbeddings({
            context: contextString
        });
        return `Understand this context: ${embedding}. Now answer this question: ${userInput}`;
    }
    /**
     * answerUserQuery builds the request and response necessary to answer a user's query
     */
    async answerUserQuery({ userInput }) {
        try {
            const prompt = await this.generatePrompt(userInput);
            const predictionApiRequest = {
                prompt
            };
            const predictionApiResponse = this.predictionApi.predict(predictionApiRequest);
            return predictionApiResponse;
        }
        catch (e) {
            console.log(e);
        }
    }
}
export default PredictorModel;
