import AnswerQueryHandler from "./routes/answerQuery.js";
import GenerateEmbeddings from "./routes/generateEmbeddings.js";
import ContextQueryHandler from "./routes/contextQuery.js";
const initRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Healthcheck succeeded');
    });
    app.get('/generateEmbeddings', GenerateEmbeddings);
    app.get('/answerQuery', AnswerQueryHandler);
    app.get('/contextQuery', ContextQueryHandler);
};
const initServer = (app, port) => {
    initRoutes(app);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
export default initServer;
