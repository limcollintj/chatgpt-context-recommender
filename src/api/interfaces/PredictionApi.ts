interface PredictionApiRequest {
    userInputString: string
    apiKey: string
}

interface PredictionApiResponse {

}


interface PredictionApi {
    predict : (request: PredictionApiRequest) => PredictionApiResponse
}