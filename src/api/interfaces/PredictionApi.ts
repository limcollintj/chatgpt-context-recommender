export interface PredictionApiRequest {
    prompt: string
}

export interface EmbeddingRequest {
    context: string
}
export interface EmbeddingResponse {
    embedding: Array<Number>
}


export interface PredictionApiResponse {
    result: string | undefined
    tokensUsed: number | undefined
}

export enum ChatGptModel {
    davinci = "text-davinci-003"
}

export interface ApiConfig {
    apiKey: string
    temperature: number
    model: ChatGptModel
}

export interface PredictionApi {
    predict : (request: PredictionApiRequest) => Promise<PredictionApiResponse>
    generateEmbeddings: (request : EmbeddingRequest) => Promise<EmbeddingResponse>
}
