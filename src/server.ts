import ChatGptApi from "./api/chatgpt";
import ConfigModel from "./config/ConfigModel";
import localDBInstance from "./database/localDBInstance/dbInstance";
import PredictorModel from "./predictor/PredictorModel";
import {Request, Response} from 'express'

const initRoutes = (app : any) => {
    app.get('/', (req : any , res : any) => {
        res.send('Healthcheck succeeded');
      });

    app.get('/updateEmbeddings', async (req : any , res : any) => {
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
      });

    app.get('/answerQuery', async (req : Request, res: Response) => {
      const userInput = req.query?.prompt?.toString()

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
    
      const response = await predictor.answerUserQuery({userInput: userInput || ''})
      console.log(response)
      res.status(200).json({result: response?.result})
    })  
      
}

const initServer = (app: any, port : any) => {
    initRoutes(app)

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
}


export default initServer