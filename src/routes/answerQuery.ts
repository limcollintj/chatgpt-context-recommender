import {Request, Response} from "express";
import ConfigModel from "../config/ConfigModel.js";
import localDBInstance from "../database/localDBInstance/dbInstance.js";
import PredictorModel from "../predictor/PredictorModel.js";
import ChatGptApi from "../api/chatgpt/index.js";
import {ChatGptModel} from "../api/interfaces/PredictionApi.js";

const AnswerQueryHandler =  async (req : Request, res: Response) => {
    const userInput = req.query?.prompt

    // 1. Build config
    const apiKey = process.env.CHATGPT_API_KEY
    if(!apiKey){
        res.status(500).send("Api Key is undefined")
        return
    }
    const modelType = process.env.MODEL_TYPE
    const config = new ConfigModel({
        chatGptApiKey: apiKey || '',
        databaseType: 'local',
        modelType: 'text-davinci-003'
    })

    // 2. Build db instance
    const database = new localDBInstance('/Users/collinlim/Projects/chatgpt-recommender/example-db/nutrition-article.txt')

    // 3. Get embeddings
    const chatGptPrediction = new ChatGptApi({
        apiKey: config.chatGptApiKey,
        model: config.modelType as ChatGptModel,
        temperature: 1
    })
    const {context} = await database.getContext({})
    const {embedding} = await chatGptPrediction.generateEmbeddings({
        context
    })


    // 3. build prediction api
    const predictor = new PredictorModel(config, chatGptPrediction, database)

    const response = await predictor.answerUserQuery({userInput: typeof userInput === 'string' ? userInput : ''})
    console.log(response)
    res.status(200).json({result: response?.result})
}


export default AnswerQueryHandler
