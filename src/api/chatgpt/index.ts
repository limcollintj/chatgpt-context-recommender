class ChatGptApi implements PredictionApi {
    chatGptApiKey: string
    
    constructor({chatGptApiKey} : {chatGptApiKey: string}) {
        this.chatGptApiKey = chatGptApiKey
    }

    predict (request: PredictionApiRequest){
        return {
            // TODO: Return some response. Call the API required
        }
    }
}

export default ChatGptApi