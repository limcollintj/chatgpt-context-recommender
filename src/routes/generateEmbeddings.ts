import ConfigModel from "../config/ConfigModel.js";
import localDBInstance from "../database/localDBInstance/dbInstance.js";
import ChatGptApi from "../api/chatgpt/index.js";
import {ChatGptModel} from "../api/interfaces/PredictionApi.js"

const GenerateEmbeddingsHandler = async (req : any , res : any) => {
    const apiKey = process.env.CHATGPT_API_KEY
    if(!apiKey){
        res.status(500).send("Api Key is undefined")
        return
    }
    const config = new ConfigModel({
        chatGptApiKey: apiKey || '',
        databaseType: 'local',
        modelType: 'text-embedding-ada-002'
    })
    const database = new localDBInstance('/Users/collinlim/Projects/chatgpt-recommender/example-db/nutrition-article.txt')

    const chatGptPrediction = new ChatGptApi({
        apiKey: config.chatGptApiKey,
        model: config.modelType as ChatGptModel,
        temperature: 1
    })
    const {context} = await database.getContext({})
    const {embedding} = await chatGptPrediction.generateEmbeddings({
        context
    })

    res.status(200).json({
        embedding
    });
}

export default GenerateEmbeddingsHandler
