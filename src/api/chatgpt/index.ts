import { Configuration, OpenAIApi } from "openai";

class ChatGptApi implements PredictionApi {
    config : ApiConfig
    openAi : OpenAIApi
    
    constructor(config : ApiConfig) {
        const configuration = new Configuration({
            apiKey: config.apiKey
        })
        this.openAi = new OpenAIApi(configuration)
        this.config = config
    }

    async predict ({prompt}: PredictionApiRequest) : Promise<PredictionApiResponse>{
        const completion = await this.openAi.createCompletion({
            prompt,
            model: this.config.model.toString(),
            temperature: this.config.temperature,
            max_tokens: 100
            });
        const responseText = completion.data.choices[0].text    
        const response : PredictionApiResponse = {
            result: responseText,
            tokensUsed: completion.data.usage?.completion_tokens
        }
        return response
    }

    async generateEmbeddings (request: EmbeddingRequest) : Promise<EmbeddingResponse> {
        const response = await this.openAi.createEmbedding({
            input: request.context,
            model: "text-embedding-ada-002" // default cheapest model
        })

        return {
            embedding: response.data.data[0].embedding
        }
    }
}

export default ChatGptApi