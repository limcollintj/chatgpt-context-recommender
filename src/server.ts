import AnswerQueryHandler from "./routes/answerQuery.js";
import GenerateEmbeddings from "./routes/generateEmbeddings.js";
import ContextQueryHandler from "./routes/contextQuery.js";

const initRoutes = (app : any) => {
    app.get('/', (req : any , res : any) => {
        res.send('Healthcheck succeeded');
      });

    app.get('/generateEmbeddings', GenerateEmbeddings);
    app.get('/answerQuery', AnswerQueryHandler);
    app.get('/contextQuery', ContextQueryHandler)

}

const initServer = (app: any, port : any) => {
    initRoutes(app)

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
}


export default initServer
