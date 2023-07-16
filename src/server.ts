const initRoutes = (app : any) => {
    app.get('/', (req : any , res : any) => {
        res.send('Healthcheck succeeded');
      });
      
}

const initServer = (app : any, port : any) => {
    initRoutes(app)

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
}


export default initServer