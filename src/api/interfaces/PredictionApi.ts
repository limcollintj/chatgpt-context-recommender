interface PredictionApiRequest {
    prompt: string
}

interface EmbeddingRequest {
    context: string
}
interface EmbeddingResponse {
    embedding: Array<Number>
}


interface PredictionApiResponse {
    result: string | undefined
    tokensUsed: number | undefined
}

enum ChatGptModel {
    davinci = "text-davinci-003"
}

interface ApiConfig {
    apiKey: string
    temperature: number
    model: ChatGptModel
}

interface PredictionApi {
    predict : (request: PredictionApiRequest) => Promise<PredictionApiResponse>
    generateEmbeddings: (request : EmbeddingRequest) => Promise<EmbeddingResponse>
}