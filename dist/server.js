"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatgpt_1 = __importDefault(require("./api/chatgpt"));
const ConfigModel_1 = __importDefault(require("./config/ConfigModel"));
const dbInstance_1 = __importDefault(require("./database/localDBInstance/dbInstance"));
const PredictorModel_1 = __importDefault(require("./predictor/PredictorModel"));
const initRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Healthcheck succeeded');
    });
    app.get('/updateEmbeddings', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const apiKey = process.env.CHATGPT_API_KEY;
        if (!apiKey) {
            res.status(500).send("Api Key is undefined");
            return;
        }
        const config = new ConfigModel_1.default({
            chatGptApiKey: apiKey || '',
            databaseType: 'local',
            modelType: 'text-embedding-ada-002'
        });
        const database = new dbInstance_1.default('/Users/collinlim/Projects/chatgpt-recommender/example-db/nutrition-article.txt');
        const chatGptPrediction = new chatgpt_1.default({
            apiKey: config.chatGptApiKey,
            model: config.modelType,
            temperature: 1
        });
        const { context } = yield database.getContext({});
        const { embedding } = yield chatGptPrediction.generateEmbeddings({
            context
        });
        res.status(200).json({
            embedding
        });
    }));
    app.get('/answerQuery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const userInput = (_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.prompt) === null || _b === void 0 ? void 0 : _b.toString();
        // 1. Build config 
        const apiKey = process.env.CHATGPT_API_KEY;
        if (!apiKey) {
            res.status(500).send("Api Key is undefined");
            return;
        }
        const modelType = process.env.MODEL_TYPE;
        const config = new ConfigModel_1.default({
            chatGptApiKey: apiKey || '',
            databaseType: 'local',
            modelType: 'text-davinci-003'
        });
        // 2. Build db instance 
        const database = new dbInstance_1.default('/Users/collinlim/Projects/chatgpt-recommender/example-db/nutrition-article.txt');
        // 3. Get embeddings
        const chatGptPrediction = new chatgpt_1.default({
            apiKey: config.chatGptApiKey,
            model: config.modelType,
            temperature: 1
        });
        const { context } = yield database.getContext({});
        const { embedding } = yield chatGptPrediction.generateEmbeddings({
            context
        });
        // 3. build prediction api 
        const predictor = new PredictorModel_1.default(config, chatGptPrediction, database);
        const response = yield predictor.answerUserQuery({ userInput: userInput || '' });
        console.log(response);
        res.status(200).json({ result: response === null || response === void 0 ? void 0 : response.result });
    }));
};
const initServer = (app, port) => {
    initRoutes(app);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
exports.default = initServer;
