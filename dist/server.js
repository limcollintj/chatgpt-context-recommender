"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Healthcheck succeeded');
    });
};
const initServer = (app, port) => {
    initRoutes(app);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
exports.default = initServer;
